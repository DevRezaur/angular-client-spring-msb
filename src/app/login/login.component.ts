import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {}

  doLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.authService.saveAuthDetails(response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert('Status: ' + error.status + '. ' + error.error);
      }
    );
  }
}
