import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate() {
    const currentUser = this.auth.currentUser ? this.auth.currentUserValue : null ;
    if (currentUser) {
        return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
