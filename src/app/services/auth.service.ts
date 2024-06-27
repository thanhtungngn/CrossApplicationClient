// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public currentUser: Observable<User | null>;
  private baseUrl = 'https://localhost:12001/api';  // Update with your API endpoint

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    });

    return this.http.post<User>(`${this.baseUrl}/account/login`, { email, password }, { headers: headers })
      .pipe(
        map(user => {
          // Store user details and jwt token in local storage or any other place
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isAuthenticated.next(true);
          }
          return user;
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  
  
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return throwError(errMsg);
  }

  signup(signupData: any, isAdmin: boolean): Observable<any> {
    if(isAdmin) {
      return this.http.post(`${this.baseUrl}/account/signupAdmin`, signupData);
    }
    return this.http.post(`${this.baseUrl}/account/signup`, signupData);
  }
}
