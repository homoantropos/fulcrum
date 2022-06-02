import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

export type VisibilityType = {visibility: string; type: string};

@Directive({
  selector: '[appChangeVisibility]'
})
export class ChangeVisibilityDirective {

  @Output('appChangeVisibility') visibility: EventEmitter<VisibilityType> = new EventEmitter<VisibilityType>();

  constructor() { }

  @HostListener('mousedown') onMouseDown(): void {
    this.visibility.emit({visibility: 'visibility_off', type: 'text'});
  }

  @HostListener('mouseup') onMouseUp(): void {
    this.visibility.emit({visibility: 'visibility', type: 'password'});
  }

}
