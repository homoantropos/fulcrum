import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../model/interfaces';
import {environment} from '../../../environments/environment';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
  }

  getUser(id?: number): Observable<User> {
    if (typeof id !== 'undefined') {
      return this.http.get<User>(`${environment.dBUlr}/user/${id}`);
    } else {
      return of({
        username: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        phones: [],
        role: '',
      } as User);
    }
  }

  createUserEntryForm(user?: User): FormGroup {
    let form: FormGroup = null;
    if (typeof user !== 'undefined') {
      form = this.fb.group({
        username: [user ? user.username ? user.username : '' : ''],
        name: [user ? user.name : ''],
        surname: [user ? user.surname : ''],
        email: [user ? user.email : '', [Validators.required, Validators.email]],
        password: [user ? user.password : ''],
        phones: this.fb.array([]),
        role: [user ? user.role : ''],
        registered: [user ? user.registered : new Date()],
        avatarSrc: [user ? user.avatarSrc : '']
      });
      if (user.phones.length > 0) {
        user.phones.map(
          phoneNumber => {
            (form.controls.phones as FormArray).push(this.fb.control( [phoneNumber]));
          }
        );
      } else {
        (form.controls.phones as FormArray).push(this.fb.control(['']));
      }
    } else {
      form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
    return form;
  }

}
