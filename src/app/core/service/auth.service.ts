import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseUser, User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;

  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentToken(): String {
    return localStorage.getItem('token') || ''
  }

  login(username: string, password: string) {
    return this.http
      .post<ResponseUser>(`${environment.apiUrl}/auth/`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // const token = user.token;
          // console.log(token);
          // console.log(user.user);
          
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          localStorage.setItem('currentUser', JSON.stringify(user.user));
          localStorage.setItem('token', user.token);
          // this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  getToken(){
    const token = localStorage.getItem('token');
    return token;
  }
}
