//base modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; //

//UI modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app-material';//
import { FlexLayoutModule } from '@angular/flex-layout';//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//
import { AutosizeModule } from 'ngx-autosize';//

//services
import { TaskService } from './services/task.service'; //
import { AuthService } from './services/auth.service'; //
import { ViewService } from './services/view.service'; //
import { InterceptService } from './services/intercept.service'; //

//pipes
import { WorkflowPipe } from './pipes/workflow.pipe';
import { LinkifyPipe } from './pipes/linkify.pipe';
import { TimerPipe } from './pipes/timer.pipe';
import { MatchPipe } from './pipes/match.pipe'; // remove

//directives
import { FocusDirective } from './directives/focus.directive';

//components
import { AppComponent } from './app.component';
// no policy
import { ProjectsComponent } from './pages/projects/projects.component';
import { SideComponent } from './pages/side/side.component';

import { TasklistComponent } from './pages/projects/first/tasklist/tasklist.component';
import { TaskdetailComponent } from './pages/projects/first/taskdetail/taskdetail.component';
import { TaskentryComponent } from './pages/projects/first/taskentry/taskentry.component';
import { TasktileComponent } from './pages/projects/first/tasktile/tasktile.component';


@NgModule({
  declarations: [
    AppComponent,
    SideComponent,
    ProjectsComponent,
    TasklistComponent,
    TaskdetailComponent,
    TaskentryComponent,
    TasktileComponent,
    // no policy
    WorkflowPipe,
    LinkifyPipe,
    TimerPipe,
    MatchPipe,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,//
    FlexLayoutModule,//
    FormsModule,//
    ReactiveFormsModule,//
    HttpClientModule,
    AutosizeModule//
  ],
  providers: [
    TaskService, //
    AuthService, //
    ViewService, //
    InterceptService //
  ],
  entryComponents: [//
    TaskentryComponent//
    // no policy
  ],//
  bootstrap: [AppComponent]
})
export class AppModule { }
