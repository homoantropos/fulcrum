import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.userService.createUserEntryForm();
    console.log(this.loginForm);
  }

  onLogin(value: any): void {
    if (this.loginForm.invalid) {
      return
    }
  }
}
