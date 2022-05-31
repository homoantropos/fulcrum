import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/interfaces';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.dBUlr}/user/${id}`);
  }
}
