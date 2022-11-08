import { Component, OnInit } from '@angular/core';
import { TaskentryComponent } from '../taskentry/taskentry.component';
import { TaskdetailComponent } from '../taskdetail/taskdetail.component';
//import { PolicyComponent } from '../../../policy/policy.component';

import { Task, workflow } from '../../../../classes/task';

import { MatBottomSheetRef, MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { TaskService } from '../../../../services/task.service';
import { AuthService } from '../../../../services/auth.service';
import { ViewService } from '../../../../services/view.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})

export class TasklistComponent implements OnInit {

    UI_now = new Date().toISOString();
    tasks:Task[];
    errorMessage: string;

  constructor(
    private taskService:TaskService,
    private bottomSheet:MatBottomSheet,
    private popup:MatDialog,
    public auth:AuthService,
    public view:ViewService
  ) { }

  ngOnInit(): void {
    this.taskService
      .read()
      .subscribe(
        value => {
          this.tasks = value.map(workflow)
          console.log('tasks should be updated')
        },
        error => this.errorMessage = <any>error
      );
  }

/*
  showPolicy(){
    let dialogueConfig = new MatDialogConfig();
    dialogueConfig.disableClose = false;
    dialogueConfig.autoFocus = true;
    this.popup.open(PolicyComponent, dialogueConfig);

  }
*/

  taskDetail(task){
    this.bottomSheet
      .open(TaskdetailComponent, {data:task}) // open in popup
      .afterDismissed()
      .subscribe((result)=>{
        if(result){
          if(result.delete){ // popup sent back request for deletion
            this.tasks = this.tasks.filter(
              x=>x._id !== result.value._id
            )
          }
          else{
            this.tasks = this.tasks.map(
              x=>x._id == result.value._id? {...result.value}: x // replace edited task
            )
          }
        };
      });
  }

  taskEntry(){
    this.bottomSheet
      .open(TaskentryComponent) // open in popup
      .afterDismissed()
      .subscribe((result)=>{
        if(result){
          this.tasks = [...this.tasks, workflow(result)] // workflow appends a current state from history
        }; // add to current list
      });
  }

}
