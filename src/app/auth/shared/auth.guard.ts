import { Injectable, trigger }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable()
export class AuthGuard implements CanActivate {

  private url: string;

  constructor(private authService: AuthService,
              private router: Router) {}

  private handleAuthState(): boolean {
    if(this.isLoginOrRegister()){
      this.router.navigate(['/rentals']);
      return false;
    }
    return true;
  }

  private handleNotAuthState(): boolean {
    if(this.isLoginOrRegister()){
      return true;
    }
    this.router.navigate(['/login']);
  }

  private isLoginOrRegister():boolean {
    if(this.url.includes('login') || this.url.includes('register')){
      return true;
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.url = state.url;

    if(this.authService.isAuthenticated()){
      return this.handleAuthState();
    }
     return this.handleNotAuthState();
  }
}
