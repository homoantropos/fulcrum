import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../model/interfaces';
import {FormArrayService} from '../../services/form-array.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../../services/user.service';

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
          switchMap((params: Params) => {return this.us.getUserById(params.id);})
        )
        .subscribe(
          {
            next: user => {this.userEntryForm = this.createForm(user);},
            error: error => {console.log(error);},
            complete: () => console.log('complete')
          }
        );
    } else {
      this.userEntryForm = this.createForm();
    }
    if (typeof this.userEntryForm !== 'undefined') {
      this.addPhone();
    }
    console.log(this.userEntryForm);
  }

  createForm(user?: User): FormGroup {
    return this.fb.group({
        username: [user?.username ? user.username : ''],
        name: [user ? user.name : ''],
        surname: [user ? user.surname : ''],
        email: [user ? user.email : ''],
        password: [user ? user.password : ''],
        phones: user ? user.phones : this.fb.array([]),
        role: [user ? user.role : ''],
        registered: [user ? user.registered : new Date()],
        avatarSrc: [user ? user.avatarSrc : '']
      }
    );
  }

  onSubmit(value: any): void {

  }

  get phones(): FormArray {
    return this.userEntryForm?.controls.phones as FormArray;
  }

  addPhone(): void {
    if (typeof this.userPhoneNumber !== 'undefined') {
      this.fas.addControl(this.phones, this.userPhoneNumber);
    }
  }

  removePhone(index: number): void {
    if (typeof this.userPhoneNumber !== 'undefined') {
      this.fas.removeControl(this.phones, index);
    }
  }
}

