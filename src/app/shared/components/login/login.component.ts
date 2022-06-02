import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {VisibilityType} from '../../directives/change-visibility.directive';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;
  submitted = false;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  // options for password hiding
  type = 'password';
  visibility = 'visibility';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.userService.createUserEntryForm();
    setTimeout(
      () => {
        if ( typeof this.loginForm.controls.email !== 'undefined') {
          this.emailInput.nativeElement.focus();
        }
      }, 0
    );
  }

  onLogin(value: any): void {
    if (this.loginForm.invalid) {
      return;
    }
  }

  setVisibility(visibility: VisibilityType): void {
    this.visibility = visibility.visibility;
    this.type = visibility.type;
  }
}
