import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthDetails } from '../model/authDetails';

@Injectable()
export class AuthService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  public login(username: string, password: string) {
    return this.http.post<any>(`${this.apiBaseUrl}/auth/authenticate`, {
      username: username,
      password: password,
    });
  }

  public refreshToken() {
    const refreshToken = this.getRefreshToken();

    return this.http
      .post<any>(`${this.apiBaseUrl}/auth/refreshtoken`, {
        token: refreshToken,
      })
      .pipe(
        tap((response) => {
          const authDetails: AuthDetails = JSON.parse(
            localStorage.getItem('authDetails') || '[]'
          );
          authDetails.token = response.accessToken;
          this.saveAuthDetails(authDetails);
        })
      );
  }

  public saveAuthDetails(authDetails: AuthDetails) {
    localStorage.setItem('authDetails', JSON.stringify(authDetails));
  }

  public isLoggedIn() {
    return !!localStorage.getItem('authDetails');
  }

  public logout(): void {
    localStorage.removeItem('authDetails');
    this.router.navigate(['/login']);
  }

  public getToken() {
    const authDetails: AuthDetails = JSON.parse(
      localStorage.getItem('authDetails') || '[]'
    );
    return authDetails.token;
  }

  public getRefreshToken() {
    const authDetails: AuthDetails = JSON.parse(
      localStorage.getItem('authDetails') || '[]'
    );
    return authDetails.refreshToken;
  }

  public getUsername() {
    const authDetails: AuthDetails = JSON.parse(
      localStorage.getItem('authDetails') || '[]'
    );
    return authDetails.username;
  }
}
