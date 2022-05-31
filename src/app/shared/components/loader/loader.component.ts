import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<mat-spinner class="midHorizontal m-t-2"></mat-spinner>`
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
