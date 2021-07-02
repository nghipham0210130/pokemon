import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router
} from '@angular/router';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard
  implements CanLoad, CanActivate, CanActivateChild {
  constructor(
    private readonly router: Router,
    private authService: AuthService
    ) {}

  canLoad() {
    return this.isAuth$();
  }

  canActivate() {
    return this.isAuth$();
  }

  canActivateChild() {
    return this.isAuth$();
  }

  private isAuth$() {
    if(!this.loggedIn()) {
      return of(false).pipe(
        tap(isAuth => {
          if (!isAuth) {
            this.router.navigate(['/not-auth']);
          }
        })
      );
    }
    return true;
  }

  loggedIn() {
    const loginCookie = localStorage.getItem('loginStatus');
    return !!loginCookie;
  }
}
