import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, example } from '../classes/task';
import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';

import * as localStorage from 'store2'; // this stops working with latest version of the package

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    public auth:AuthService,
    private client:HttpClient
  ){}

  create(data:any):Observable<any> { console.warn("Creating task...");
    if(this.auth.loggedIn){
      return this.client.post<Task>(environment.baseurl + 'api/tasks', data);
    }
    else{
      let now = new Date().toISOString();
      data._id = "guest_" + now;
      data.updatedAt = now;
      localStorage.add('tasks', data);
      return of(data);
    }
  }

  read():Observable<any>{ console.warn("Reading tasks...");
    if(!localStorage('tasks')){localStorage('tasks', [example()])}
    return new Observable((obs)=>{
      obs.next([])
      this.auth.getUser$().toPromise().then((profile)=>{
        if(profile){ console.log("Signed in as: " + profile.nickname);
          (async()=>{ // wait for full upload before retrieving from server
            await(async()=>{ // wait for individual upload before uploading next one
              if(localStorage('tasks').length > 0){ console.log("Local task detected, uploading...")
                for (let task of localStorage('tasks')){
                  await this.create(task).toPromise().then(()=>{
                    this.delete(task._id).toPromise();
                  })
                }
              }
            })()
            this.client.get(environment.baseurl + 'api/tasks/')
            .toPromise().then((result)=>{obs.next(result)})
          })()
        }
        else{ console.log("You are not signed in!")
          obs.next(localStorage('tasks'));
        }
      })
    })
  }

  update(taskID:any, data:any){ console.warn("Updating task " + taskID + "...");
    if(this.auth.loggedIn){
      return this.client.put(environment.baseurl + 'api/tasks/' + taskID, data);
    }
    else{
      localStorage.transact('tasks', (content) => { // reach inside the list of tasks
        let target = content[localStorage('tasks').findIndex((i)=>i._id==taskID)]; // task of interest
        for(let property in data){
          if(data[property].constructor === Object){target[property].push(data[property]);} // append, for history
          else{target[property] = data[property];} // other properties are replaced
        }
        target.updatedAt = new Date().toISOString();

      })
      return of(true);
    }
  }

  delete(taskID:any){
    if(this.auth.loggedIn && !taskID.includes("guest_")){
      console.warn("Deleting task " + taskID + "...");
      return this.client.delete(environment.baseurl + 'api/tasks/' + taskID)
    }
    else{
      localStorage.transact('tasks', (content) => {
        let target = content[localStorage('tasks').findIndex((i)=>i._id==taskID)];
        content.splice(target, 1);
      });
      return of(true);
    }
  }

}
