import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './pages/projects/projects.component';
import { TasklistComponent } from './pages/projects/first/tasklist/tasklist.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptService } from './services/intercept.service';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'projects'},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/first', redirectTo: 'projects/first/tasks'},
  {path: 'projects/first/tasks', component: TasklistComponent}, // canActivate: [AuthGuard]}
  {path: "**", redirectTo: 'projects'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    /*
    */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }
  ]
})

export class AppRoutingModule { }
