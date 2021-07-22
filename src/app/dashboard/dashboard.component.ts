import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private restApi: RestApiService) {}

  ngOnInit(): void {
    this.restApi.getAllUsers().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
