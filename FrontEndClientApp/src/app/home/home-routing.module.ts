import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegComponent } from './registration/reg.component';
import { LoginComponent } from './registration/login/login.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { MainComponent } from './main/main.component';
import { MoviesComponent } from './movies/movies.component';
import { TvshowsComponent } from './tvshows/tvshows.component';
import { SessionactiveGuard } from '../guard/sessionactive.guard';
import {LogoutComponent} from './registration/logout/logout.component';


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
      component: LoginComponent
    }, {
      path: '',
      canActivate: [AuthGuard],
      component: LoginRegComponent
    }, {
      path: 'logout',
      component: LogoutComponent
    }],
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'tvshows',
    component: TvshowsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
