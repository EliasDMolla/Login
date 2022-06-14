import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private afAuth: AngularFireAuth) { 
  }

  public get currentUserValue() {
    return this.currentUserSubject ? this.currentUserSubject.value : null;
  }

  async Login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async Register(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async Logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    })
  }

  ChangePassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  SaveCredentials(user: User) {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }

    localStorage.setItem('user', JSON.stringify(user));
  }
}
