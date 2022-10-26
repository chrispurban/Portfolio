import { Component, OnInit, Inject, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { Task, workflow } from '../../../../classes/task';

import { TaskService } from '../../../../services/task.service';
import { ViewService } from '../../../../services/view.service';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.scss']
})

export class TaskdetailComponent implements OnInit {

  @ViewChild('issue') issue;
  @ViewChild('subject') subject;
  @ViewChild('notes') notes;
  @ViewChild('deadline') deadline;

  UI_thinking = false;
  UI_deletionProtection = true;
  UI_editingNotes = false;
  UI_hoveringLink = false;
  task;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private input:any,
    private popup:MatBottomSheetRef<TaskdetailComponent>,
    private element:ElementRef, private renderer:Renderer2,
    public taskService:TaskService,
    public view:ViewService
  ){}

  ngOnInit():void{
    this.task = Object.assign([], workflow(this.input));
    if(!this.task.notes){this.UI_editingNotes = true};
  }

// database mechanisms /////////////////////////////////////////////////////////////////////

  update(transition?){
    let changes = {}; // queue of what to save

    ["issue", "subject", "notes", "deadline"]
      .forEach(i => {if(this[i].dirty){changes[i] = this.task[i]};});

    if(transition){
      changes['history'] = {
        id:workflow(this.task.state.phase + transition).id,
        time:new Date().toISOString()
      }
    }

    if(Object.keys(changes).length > 0){ // one of the above changes were made
      this.UI_thinking = true;
      this.taskService
        .update(this.task._id, changes).subscribe(value => {
          if(transition){
            this.task.history.push(changes['history']); // change what group it's in
            this.task = workflow(this.task);
          }
          this.task.updatedAt = new Date().toISOString();
          this.popup.dismiss({value:this.task}); // pass back to main list
        });
    }
    else{this.popup.dismiss();}
  }

  delete(){
    if(this.UI_deletionProtection){this.UI_deletionProtection = false;}
    else{
      this.UI_thinking = true;
      this.taskService
        .delete(this.task._id).subscribe(
          value => this.popup.dismiss({value:this.task, delete:true})
        );
    }
  }

// UI mechanisms /////////////////////////////////////////////////////////////

  listener(){};

  ngAfterViewInit(){ // protect the notes from switching to edit mode while clicking hyperlinks
    this.element.nativeElement.querySelectorAll('.linkified').forEach(link => {
      this.listener = this.renderer.listen(link, "mouseenter", event => this.UI_hoveringLink = true);
      this.listener = this.renderer.listen(link, "mouseleave", event => this.UI_hoveringLink = false);
    });
  }

  toggleNotes(){if(!this.UI_hoveringLink){this.UI_editingNotes = true}}

  ngOnDestroy(){this.listener()}

}
