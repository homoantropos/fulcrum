import {Directive, HostBinding, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appMenuBarStyling]'
})

export class MenuBarStylingDirective implements OnChanges {

  @Input() isActive = false;

  @HostBinding('style.color') color = 'white';

  currentColor = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.isActive;
    if (change.currentValue) {
      this.color = 'gold';
    } else {
      this.color = 'white';
    }
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.currentColor = this.color;
    this.color = 'magenta';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.currentColor !== 'magenta') {
      this.color = this.currentColor;
    }
  }

  @HostListener('mousedown') onMouseDown(): void {
    this.currentColor = this.color;
    this.color = 'yellow';
  }

  @HostListener('mouseup') onMouseUp(): void {
    this.color = 'gold';
  }
}
