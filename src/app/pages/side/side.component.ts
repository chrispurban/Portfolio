import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})

export class SideComponent implements OnInit {

  constructor(
    public auth:AuthService,
    public view:ViewService
  ){}

  ngOnInit():void{
    this.view.resize();
    window.addEventListener('resize', ()=>{this.view.resize()});
  }

  @ViewChild('outlet') outlet;
  loaded(component){this.outlet = component;}

}
