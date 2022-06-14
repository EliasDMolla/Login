import { Injectable } from '@angular/core';
import { User } from '../entities/user.entity';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private loginService: LoginService) { }

  
}
