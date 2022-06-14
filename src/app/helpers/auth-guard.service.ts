import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate() {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
        return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
