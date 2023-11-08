import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent
{
  model: any = {}

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) { }

  login()
  {
    // Http requests do not need to be unsubscribed from, as http requests complete
    this.accountService.login(this.model).subscribe({
      // After receiving a response from logging in, navigate to the member list
      // response could be replaced with () or _, since we're not acccessing it in code
      next: response => this.router.navigateByUrl('/members'),
      // Send a toastr message for errors
      error: error => this.toastr.error(error.error)
    })
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
