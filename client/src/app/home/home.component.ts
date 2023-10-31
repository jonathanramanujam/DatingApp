import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  registerMode = false;
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void
  {
    this.getUsers();
  }

  registerToggle()
  {
    this.registerMode = !this.registerMode;
  }

  getUsers()
  {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response, // This lambda uses the response from the get() above, and assigns it to users.
      error: error => console.log(error), // This lambda will capture an error, and log it to the console.
      complete: () => console.log("Request Complete.") // This is essentially a void lambda. When the initialization completes, post this message.
    })
  }

  cancelRegisterMode(event: boolean)
  {
    this.registerMode = event;
  }

}
