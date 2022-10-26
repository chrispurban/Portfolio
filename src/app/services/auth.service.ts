import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loggedIn: boolean = null;

  auth0Client$ = (
      from(
        createAuth0Client({
          domain: environment.AUTH0_DOMAIN,
          client_id: environment.AUTH0_CLIENT_ID,
          redirect_uri: `${window.location.origin}`,
          audience: "task.api"
        })
      ) as Observable<Auth0Client>
    )
    .pipe(
      shareReplay(1), catchError(err => throwError(err)) // Every subscription receives the same shared value
    );

  // Define observables for SDK methods that return promises by default For each Auth0 SDK method, first ensure the client instance is ready concatMap: Using the client instance, call SDK method; SDK returns a promise from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client:Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );

  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client:Auth0Client) => from(client.handleRedirectCallback()))
  );

  private userProfileSubject$ = new BehaviorSubject<any>(null);  // Create subject and public observable of user profile data
  userProfile$ = this.userProfileSubject$.asObservable();

  constructor(private router:Router) {
    this.localAuthSetup(); // On initial load, check authentication state with authorization server, set up local auth streams if user is already authenticated
    this.handleAuthCallback(); // Handle redirect from Auth0 login
  }

  getUser$(options?):Observable<any> {
    // When calling, options can be passed if desired; see https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
    return this.auth0Client$.pipe(
      concatMap((client:Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  private localAuthSetup() {
    // This should only be called on app initialization to set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn:boolean) => {
        if (loggedIn) {return this.getUser$();} // If authenticated, get user and set in app; NOTE: you could pass options here if needed
        return of(loggedIn); // If not authenticated, return stream that emits 'false'
      })
    );
    checkAuth$.subscribe();
  }

  getTokenSilently$(options?): Observable<string> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
    );
  }

  login(redirectPath:string = '/') {
    this.auth0Client$.subscribe((
      client:Auth0Client) => { // A desired redirect path can be passed to login method (e.g., from a route guard); ensure Auth0 client instance exists
      client.loginWithRedirect({ // Call method to log in
        redirect_uri: `${window.location.origin}`,
        appState: { target: redirectPath }
      });
    });
  }

  private handleAuthCallback() { // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute:string; // Path to redirect to after login processsed
      const authComplete$ = this.handleRedirectCallback$.pipe(
        tap(cbRes => { // Have client, now call method to handle auth callback redirect
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/'; // Get and set target redirect route from callback results
        }),
        concatMap(() => {
          return combineLatest([ // Redirect callback complete; get user and login status
            this.getUser$(), this.isAuthenticated$
          ]);
        })
      );
      authComplete$.subscribe(([user, loggedIn]) => { // Subscribe to authentication completion observable; response will be an array of user and login status
        this.router.navigate([targetRoute]); // Redirect to target route after callback processing
      });
    }
  }

  logout() { // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client:Auth0Client) => { // Call method to log out
      client.logout({
        client_id: environment.AUTH0_CLIENT_ID,
        returnTo: `${window.location.origin}`
      });
    });
  }

}
