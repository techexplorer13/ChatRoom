import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegComponent } from './registration/reg.component';
import { LoginComponent } from './registration/login/login.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { IonicModule } from '@ionic/angular';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'main',
    pathMatch:'full'
  },
  {
    path: 'accountinfo',
    children: [{
      path: 'login',
      canActivate:[AuthGuard],
      component: LoginComponent
    }],
    component: LoginRegComponent
  },
  {
    path: 'main',
    component: MainComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule,FormsModule,IonicModule],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
