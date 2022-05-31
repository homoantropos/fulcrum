import { Component, OnInit } from '@angular/core';
import {MenuPoint} from '../../../shared/model/utility-interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  menu: Array<MenuPoint> = [
    {option: 'main', isActive: true},
    {option: 'aims', isActive: false}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
