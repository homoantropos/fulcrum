import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './components/main-layout.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {UserEntryComponent} from '../shared/components/user-entry/user-entry.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: '', component: MainPageComponent, children: [
          {path: 'register', component: UserEntryComponent},
          {path: 'login', component: UserEntryComponent}
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule {
}
