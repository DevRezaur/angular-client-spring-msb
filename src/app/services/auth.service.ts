import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    return this.http.post<any>('http://localhost:9191/auth/authenticate', {
      username: username,
      password: password,
    });
  }

  public refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post<any>('http://localhost:9191/auth/refreshtoken', {
      token: refreshToken,
    });
  }

  public isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  public getToken() {
    return localStorage.getItem('token');
  }
}
