import { Injectable } from '@angular/core';
import {MenuPoint} from '../model/utility-interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuBarService {

  constructor() { }

  activate(menuPoints: Array<MenuPoint>, option: string): Array<MenuPoint> {
    menuPoints.map(
      point => {
        point.isActive = point.option === option;
      }
    );
    return menuPoints;
  }
}
