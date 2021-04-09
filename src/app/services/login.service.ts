import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Get() {
    return this.http.get<User>('https://6057de5ac3f49200173ad07c.mockapi.io/api/test/users');
  }

  FindByUid(uid: string): Observable<User> {
    return this.http.get<User>(`https://6057de5ac3f49200173ad07c.mockapi.io/api/test/users?uid=${uid}`);
  }

  Put(user: User) {
    return this.http.put<User>(`https://6057de5ac3f49200173ad07c.mockapi.io/api/test/users/${user.id}`, user);
  }

  Post(user: User): Observable<User> {
    return this.http.post<User>('https://6057de5ac3f49200173ad07c.mockapi.io/api/test/users', user);
  }
}
