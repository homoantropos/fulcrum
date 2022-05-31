import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './components/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    MainLayoutComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    SharedModule
  ]
})
export class MainLayoutModule { }
