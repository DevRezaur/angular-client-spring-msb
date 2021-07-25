import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  doLogin() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (this.loginForm.invalid) {
      alert('Enter Credentials');
    } else {
      this.authService.login(username, password).subscribe(
        (response) => {
          this.authService.saveAuthDetails(response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          if (error.status === '401') alert(error.error);
          else alert('Login Service Unavailable');
        }
      );
    }
  }
}
