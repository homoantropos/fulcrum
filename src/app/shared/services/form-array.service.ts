import { Injectable } from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormArrayService {

  constructor() { }

  addControl(formArray: FormArray, formControl: FormGroup): void {
    formArray.push(
      formControl
    );
  }

  removeControl(formArray: FormArray, index: number): void {
    formArray.removeAt(index);
  }

}
