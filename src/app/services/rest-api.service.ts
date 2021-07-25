import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable()
export class RestApiService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBaseUrl}/user/read/all`);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/user/create`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/user/update`, user);
  }

  public deleteUser(id: number | null): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/user/delete/${id}`);
  }
}
