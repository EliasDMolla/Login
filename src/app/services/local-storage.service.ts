import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  SaveCredentials(uid: string) {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
    
    localStorage.setItem('user', uid);
  }
  
}
