import { ToastrService } from 'ngx-toastr';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) =>
{
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  // If we have a current user, return true
  return accountService.currentUser$.pipe(
    map(user => {
      if (user) return true;
      else
      {
        toastr.error('You shall not pass!');
        return false;
      }
    })
  )
};
