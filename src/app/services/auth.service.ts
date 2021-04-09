import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: any;

  constructor(private afAuth: AngularFireAuth,
              private af: AngularFirestore) { 
  }

  public get currentUserValue() {
    return this.currentUser ? this.currentUser.value : null;
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
}
