import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
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

  @ViewChild('emailInput') private emailInput: ElementRef;
  showFullForm: boolean | undefined;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private us: UserService
  ) {
  }

  ngOnInit(): void {
    this.showFullForm = !this.route.toString().includes('login');
    if (this.route.toString().includes('edit')) {
      this.route.params
        .pipe(
          switchMap((params: Params) => {
            return this.us.getUser(params.id);
          }),
          catchError(error => {
            return throwError(error);
          })
        )
        .subscribe({
            next: user => this.userEntryForm = this.us.createUserEntryForm(user),
            error: error => console.log(error)
          });
    } else if (this.route.toString().includes('register')) {
      this.us.getUser()
        .subscribe({
          next: user => this.userEntryForm = this.us.createUserEntryForm(user),
          error: error => console.log(error)
        });
    } else {
      this.userEntryForm = this.us.createUserEntryForm();
    }
    setTimeout(
      () => {
        if (typeof this.userEntryForm.controls.email !== 'undefined') {
          this.emailInput.nativeElement.focus();
        }
      }, 0
    );
  }

  onSubmit(value: any): void {
    if (this.userEntryForm.invalid) {
      return;
    }
    this.submitted = true;
  }

  get phones(): FormArray {
    return this.userEntryForm.controls?.phones as FormArray;
  }

  addPhone(phones?: Array<string>): void {
    this.phones.push(this.fb.group({userPhoneNumber: ['']}));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }
}

