import { Component, OnInit, Inject} from '@angular/core';
import { Task, workflow } from '../../../../classes/task';
import { TaskService } from '../../../../services/task.service';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
//import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-taskentry',
  templateUrl: './taskentry.component.html',
  styleUrls: ['./taskentry.component.scss']
})

export class TaskentryComponent implements OnInit {

  UI_thinking = false;
  UI_now = new Date();
  task = {subject:'', issue:'', notes:'', deadline:'', history:[]};
  errorMessage:string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data:any,
    private popup:MatBottomSheetRef<TaskentryComponent>,
    private taskService:TaskService
  ){}

  ngOnInit():void{}

  onSubmit(){
    this.UI_thinking = true;
    this.task.history.push({
      id:workflow(0).id, // send to first stage
      time:new Date().toISOString() // current time
    });
    this.taskService
      .create(this.task).subscribe(
        value => {this.popup.dismiss(value)},
        error => this.errorMessage = <any>error
      );
    }

}
