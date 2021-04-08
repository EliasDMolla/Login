import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private af: AngularFirestore) { 

    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // })
  }

  async Login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async Register(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async Logout() {
    return this.afAuth.signOut().then(() => {
      // localStorage.removeItem('user');
      // this.router.navigate(['login']);
    })
  }

  ChangePassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
