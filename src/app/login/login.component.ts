import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private restApi: RestApiService, private router: Router) {
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {}

  doLogin() {
    this.restApi.login(this.username, this.password).subscribe(
      (data: any) => {
        alert(data.token);
      },
      (error) => {
        if (error.status === 400) {
          alert('Invalid credentials');
        } else {
          alert('Woops! Something went wrong !!!');
        }
      }
    );
  }
}
