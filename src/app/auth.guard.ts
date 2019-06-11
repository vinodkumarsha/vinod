import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppService } from './app.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@Inject(AppService) private appService: AppService, private router: Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //return this.permission.canActivate();
    if (this.appService.isAuthenticated) {
    // logged in so return true
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['']);
    return false;
  }
  
}

