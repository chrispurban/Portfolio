import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class InterceptService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(
    req:HttpRequest<any>,
    next:HttpHandler
  ):Observable<HttpEvent<any>> {
    //console.warn('request is: ' + req.url);
    //console.warn('environment is: ' + environment.baseurl + 'api/projects')
    //console.error(req.url == environment.baseurl + 'api/projects');

    if(req.url == environment.baseurl + 'api/projects'){
      return next.handle(req.clone());
    }
    else{

      return this.auth.getTokenSilently$().pipe(
        mergeMap(token => {
          let tokenReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(tokenReq);
        }),
        catchError(err => throwError(err)) // rejections based on login status are redundant to the server's
      );

    }

  }
}
