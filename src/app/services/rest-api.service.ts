import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestApiService {
  constructor(private http: HttpClient) {}

  public getAllUsers() {
    return this.http.get<any>('http://localhost:9191/user/read/all');
  }
}
