import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ViewService } from '../../services/view.service';
import { Location } from '@angular/common';
import {
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})

export class SideComponent implements OnInit {

  isSmall = false;

  constructor(
    public auth:AuthService,
    public view:ViewService,
    public readonly location:Location,
    private breakpointer:BreakpointObserver
  ){}

  ngOnInit():void{
    this.view.resize();
    window.addEventListener('resize', ()=>{this.view.resize()});

    this.breakpointer
      .observe(
        Breakpoints.XSmall
      )
      .subscribe(
        result=>{
          this.isSmall = result.matches?true:false
        }
      )

  }

  @ViewChild('outlet') outlet;
  loaded(component){
    this.outlet = component;
    console.error(this.location.path())
  }

}
