import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit // Implementing OnInit allows us to set some initialization
{
  title = 'Dating App';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit(): void // OnInit needs to be implemented here
  {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers()
  {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response, // This lambda uses the response from the get() above, and assigns it to users.
      error: error => console.log(error), // This lambda will capture an error, and log it to the console.
      complete: () => console.log("Request Complete.") // This is essentially a void lambda. When the initialization completes, post this message.
    })
  }

  setCurrentUser()
  {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

}
