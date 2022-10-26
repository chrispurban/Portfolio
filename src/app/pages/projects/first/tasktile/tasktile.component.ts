import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasktile',
  templateUrl: './tasktile.component.html',
  styleUrls: ['./tasktile.component.scss']
})
export class TasktileComponent implements OnInit {

  constructor() { }

  @Input() tasque;

  ngOnInit(): void {
  }

}
