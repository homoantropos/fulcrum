import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './components/main-layout.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {UserEditorComponent} from '../shared/components/user-editor/user-editor.component';
import {LoginComponent} from '../shared/components/login/login.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: '', component: MainPageComponent, children: [
          {path: 'register', component: UserEditorComponent},
          {path: 'edit/:id', component: UserEditorComponent},
          {path: 'login', component: LoginComponent}
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
