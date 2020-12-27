import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DataService } from '../services/data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ClickoutsideDirective } from '../directives/clickoutside.directive';

@NgModule({
  declarations:[ClickoutsideDirective,HomePage],
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[DataService]
})
export class HomePageModule {}
