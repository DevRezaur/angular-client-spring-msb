import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public username = this.authService.getUsername();
  public users: User[] = [];

  constructor(
    private authService: AuthService,
    private restApi: RestApiService
  ) {}

  ngOnInit(): void {
    this.restApi.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error) => {
        alert('Get All User Service Unavailable');
      }
    );
  }

  doLogout() {
    this.authService.logout();
  }
}
