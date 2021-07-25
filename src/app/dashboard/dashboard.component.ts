import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
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
  public refresh$ = new BehaviorSubject<boolean>(true);
  public userToBeDeleted: number | null = null;

  createUserForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    fullname: new FormControl(null, Validators.required),
    nickname: new FormControl(null, Validators.required),
    contact: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern('^[0-9]*$'),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  updateUserForm: FormGroup = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    fullname: new FormControl(null, Validators.required),
    nickname: new FormControl(null, Validators.required),
    contact: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern('^[0-9]*$'),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService,
    private restApi: RestApiService
  ) {}

  ngOnInit(): void {
    this.refresh$.subscribe((_) => this.getAllUser());
  }

  getAllUser() {
    this.restApi.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error) => {
        if (error.status === '401') alert(error.error);
        else alert('Get All User Service Unavailable');
      }
    );
  }

  createUser() {
    this.restApi.createUser(this.createUserForm.value).subscribe(
      (_) => {
        this.refresh$.next(true);
      },
      (error) => {
        if (error.status === '401') alert(error.error);
        else alert('Create New User Service Unavailable');
      }
    );

    this.clearAllForms();
  }

  setUpdateUser(user: User) {
    this.clearAllForms();
    this.updateUserForm.controls['id'].setValue(user.id);
    this.updateUserForm.controls['fullname'].setValue(user.fullname);
    this.updateUserForm.controls['nickname'].setValue(user.nickname);
    this.updateUserForm.controls['contact'].setValue(user.contact);
    this.updateUserForm.controls['email'].setValue(user.email);
  }

  updateUser() {
    this.restApi.updateUser(this.updateUserForm.getRawValue()).subscribe(
      (_) => {
        this.refresh$.next(true);
      },
      (error) => {
        if (error.status === '401') alert(error.error);
        else alert('Update User Service Unavailable');
      }
    );

    this.clearAllForms();
  }

  deleteUser(id: number | null) {
    this.userToBeDeleted = id;
  }

  doDeleteUser() {
    this.restApi.deleteUser(this.userToBeDeleted).subscribe(
      (response) => {
        this.refresh$.next(true);
      },
      (error) => {
        if (error.status === '401') alert(error.error);
        else alert('Delete User Service Unavailable');
      }
    );
  }

  clearAllForms() {
    this.createUserForm.reset();
    this.updateUserForm.reset();
  }

  doLogout() {
    this.authService.logout();
  }
}
