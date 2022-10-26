import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../services/view.service';

import { Project } from '../../classes/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  errorMessage:string;
  projects:Project[];

  constructor(public view:ViewService){}

  ngOnInit():void {

    this.view
      .readProjects()
      .subscribe(
        value => this.projects = value,
        error => {
          this.errorMessage = <any>error;
          console.log(this.errorMessage);
        }
      );
    // for(let n of Array(0)){  this.projects.push(this.projects[0]);}
  }

}
