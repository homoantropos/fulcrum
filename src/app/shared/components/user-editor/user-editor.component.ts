import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {catchError, switchMap} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html'
})

export class UserEditorComponent implements OnInit {

  userEntryForm: FormGroup | undefined;

  @ViewChild('nameInput') private nameInput: ElementRef;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    if (this.route.toString().includes('edit')) {
      this.route.params
        .pipe(
          switchMap((params: Params) => {
            return this.userService.getUser(params.id);
          }),
          catchError(error => {
            return throwError(error);
          })
        )
        .subscribe({
          next: user => this.userEntryForm = this.userService.createUserEntryForm(user),
          error: error => console.log(error)
        });
    } else if (this.route.toString().includes('register')) {
      this.userService.getUser()
        .pipe(
          catchError(error => {
            return throwError(error);
          })
        )
        .subscribe({
          next: user => this.userEntryForm = this.userService.createUserEntryForm(user),
          error: error => console.log(error)
        });
    }
    setTimeout(
      () => {
        if (typeof this.userEntryForm?.controls.name !== 'undefined') {
          this.nameInput.nativeElement.focus();
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

  addPhone(): void {
    this.phones.push(this.fb.control(['']));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

}

