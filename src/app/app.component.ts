import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'fulcrum';
  // @ts-ignore
  dateForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      date: [Date.now()]
    });
  }

  onSubmit(formGroup: FormGroup): void {
    console.log(formGroup.value.date);
  }

  goToLogin(): void {
    this.router.navigate(['main', 'login']);
  }

}
