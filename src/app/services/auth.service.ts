import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class authService {
  
  private _loginUrl = 'http://localhost:8085/user/login';

  constructor(private _http: HttpClient, private _router: Router) {}

  login(username: string, password: string): Observable<any> {
    let user = new User(null, '', '', '', '', new Date());
    user.username = username;
    user.password = password;
    console.log('LoginService.login()');
    return this._http.post<any>(this._loginUrl, user);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.getToken() !== null;
  }

isTokenExpired(): boolean {

    let token = this.getToken();
    if (token) {
      
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(tokenPayload.exp * 1000);
      const currentDate = new Date();
      return expirationDate <= currentDate;

    } else {
      return true;
    }

  }

  getUserFromToken(): User | null {
    let token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      const date = JSON.parse(payload).user.dateOfBirth;
      if (date !== null) {
        JSON.parse(payload).user.dateOfBirth = new Date(date);
      }
      return JSON.parse(payload).user;
    } else {
      return null;
    }
  }

  redirectToLogin(): void {
    this._router.navigate(['/login']);
  }

}
