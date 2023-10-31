import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root' // Implicitly provided in the root app.module
})
export class AccountService
{
  baseUrl = 'https://localhost:5001/api/';
  // Adding an observable here allows other components to check the account service
  // and see if a user is currently logged in.
  // A BehaviorSubject is a special type of observable that lets us set an initial value
  // <User | null> 'Union Type' Allows the type to be either User or null
  // '$' is a convention to denote an observable
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any)
  {
    // .pipe allows us to do something with the response that is returned.
    // In this case, we can retrieve the user on login and set it in the local storage
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) =>
      {
        const user = response;
        if (user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any)
  {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user =>
      {
        if (user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User)
  {
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
