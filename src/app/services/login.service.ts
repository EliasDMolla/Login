import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  Get() {
    return this.http.get<User>('https://6057de5ac3f49200173ad07c.mockapi.io/api/test/Users');
  }

  Post(credentials: Credential): Observable<User> {
    return this.http.post<User>('https://6057de5ac3f49200173ad07c.mockapi.io/api/test/Users', credentials);
  }
}
