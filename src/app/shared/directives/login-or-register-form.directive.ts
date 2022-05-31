import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appLoginOrRegisterForm]'
})
export class LoginOrRegisterFormDirective {

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
    this.container.clear();
    this.container.createEmbeddedView(this.template);
  }

}
