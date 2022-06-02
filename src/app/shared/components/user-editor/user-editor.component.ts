import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html'
})

export class UserEditorComponent implements OnInit {

  userEntryForm: FormGroup | undefined;
  @Input() currentUserId: number | undefined;

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
        .subscribe({
          next: (params: Params) => this.currentUserId = params.id,
          error: error => console.log(error)
        });
    }
    this.userService.getUser(this.currentUserId)
      .subscribe({
        next: user => {
          this.userEntryForm = this.userService.createUserEntryForm(user);
          setTimeout(
            () => {
              if (typeof this.userEntryForm?.controls.name !== 'undefined') {
                this.nameInput.nativeElement.focus();
              }
            }, 0
          );
        },
        error: error => console.log(error)
      });
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

