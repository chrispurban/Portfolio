import { Injectable } from '@angular/core';
import { Project } from '../classes/project';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ViewService {

  height;
  width;
  scale;
  gap = 32;

  constructor(
    private client:HttpClient
  ){}

  resize(){
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    //console.log(this.height + " x " + this.width);

    if(this.width >= this.height/2){this.scale = this.height/2;}
    else{this.scale = this.width;};
  }

  readProjects():Observable<Project[]> {
    return this.client.get<Project[]>(environment.baseurl + 'api/projects');
  }

}
