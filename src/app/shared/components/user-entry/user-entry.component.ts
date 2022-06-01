import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../model/interfaces';
import {FormArrayService} from '../../services/form-array.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {catchError, switchMap} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html'
})

export class UserEntryComponent implements OnInit {

  userEntryForm: FormGroup | undefined;
  userPhoneNumber: FormGroup | undefined;
  showFullForm: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private fas: FormArrayService,
    private auth: AuthService,
    private us: UserService
  ) {
  }

  ngOnInit(): void {
    this.showFullForm = !this.route.toString().includes('login');
    this.userPhoneNumber = this.fb.group({userPhoneNumber: ['']});
    if (this.route.toString().includes('edit')) {
      this.route.params
        .pipe(
          switchMap((params: Params) => {
            return this.us.getUserById(params.id);
          }),
          catchError(error => {
            console.log(error);
            return throwError(error);
          })
        )
        .subscribe(
          {
            next: user => {
              this.userEntryForm = this.createForm(user);
              this.addPhone(user.phones);
              console.log(this.userEntryForm);
            },
            error: error => console.log(error),
            complete: () => console.log('complete')
          }
        );
    } else {
      this.userEntryForm = this.createForm();
      this.addPhone();
    }
    if (typeof this.userEntryForm !== 'undefined') {
      this.addPhone();
    }
    setTimeout(
      () => console.log(this.userEntryForm), 0
    );
  }

  createForm(user?: User): FormGroup {
    const form = this.fb.group({
      username: [user ? user.username ? user.username : '' : ''],
      name: [user ? user.name : ''],
      surname: [user ? user.surname : ''],
      email: [user ? user.email : ''],
      password: [user ? user.password : ''],
      phones: this.fb.array([]),
      role: [user ? user.role : ''],
      registered: [user ? user.registered : new Date()],
      avatarSrc: [user ? user.avatarSrc : '']
    });
    return form;
  }

  onSubmit(value: any): void {

  }

  get phones(): FormArray {
    return this.userEntryForm?.controls.phones as FormArray;
  }

  addPhone(phones?: Array<string>): void {
    if (typeof phones !== 'undefined') {
      phones.map(
        phoneNumber => this.fas.addControl(this.phones, this.fb.group({userPhoneNumber: [phoneNumber]}))
        );
    } else {
      this.fas.addControl(this.phones, this.fb.group({userPhoneNumber: ['']}));
    }
  }

  removePhone(index: number): void {
    if (typeof this.userPhoneNumber !== 'undefined') {
      this.fas.removeControl(this.phones, index);
    }
  }
}

