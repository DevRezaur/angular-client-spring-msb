import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    return this.http
      .post('http://localhost:9191/auth/authenticate', {
        username: username,
        password: password,
      })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
