import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { DataService } from '../services/data.service';
import { MainComponent } from './main/main.component';
import { LoginComponent } from 'src/app/home/registration/login/login.component';
import { LoginRegComponent } from 'src/app/home/registration/reg.component'
import { ClickoutsideDirective } from 'src/app/directives/clickoutside.directive';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from './main/search/search.component';

@NgModule({
  declarations: [HomePage, MainComponent,ClickoutsideDirective,LoginRegComponent, LoginComponent,SearchComponent],
  imports: [
    HomePageRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ],
  providers: [DataService],
})
export class HomePageModule { }
