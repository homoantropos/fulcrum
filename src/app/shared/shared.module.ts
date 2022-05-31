import { LOCALE_ID, NgModule } from '@angular/core';
import {registerLocaleData} from '@angular/common';
import uaLocale from '@angular/common/locales/uk';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import {MenuBarStylingDirective} from './directives/menu-bar-styling.directive';
import { UserEntryComponent } from './components/user-entry/user-entry.component';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginOrRegisterFormDirective } from './directives/login-or-register-form.directive';

registerLocaleData(uaLocale, 'uk');

@NgModule({
  declarations: [
    MenuBarComponent,
    MenuBarStylingDirective,
    UserEntryComponent,
    LoaderComponent,
    LoginOrRegisterFormDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MenuBarComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'uk'}
  ]
})
export class SharedModule { }
