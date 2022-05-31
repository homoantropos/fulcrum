import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuPoint} from '../../model/utility-interfaces';
import {MenuBarService} from '../../services/menu-bar.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  @Input() menu: Array<MenuPoint> = [];
  @Output() option: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private ms: MenuBarService
  ) { }

  ngOnInit(): void {
  }

  onClick(option: string): void {
    this.menu = this.ms.activate(this.menu, option);
    this.option.emit(option);
  }
}
