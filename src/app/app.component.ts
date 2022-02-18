import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fulcrum';
  // @ts-ignore
  dateForm: FormGroup;

  constructor(
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
}
