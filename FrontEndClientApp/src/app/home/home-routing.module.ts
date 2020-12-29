import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegComponent } from './registration/reg.component';
import { LoginComponent } from './registration/login/login.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'accountinfo',
    children: [{
      path: 'login',
      canActivate: [AuthGuard],
      component: LoginComponent
    }, {
      path: '',
      component: LoginRegComponent
    }],
  },
  {
    path: 'main',
    component: MainComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
