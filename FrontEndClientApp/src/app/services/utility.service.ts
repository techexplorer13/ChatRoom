import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  overlayVisible:boolean
  constructor(private loadingCntrl:LoadingController) { }

  public async presentLoader() {
    await this.loadingCntrl.create({
      spinner: "crescent",
      message: "Please wait.."
    }).then(val => {
      val.present();
      this.overlayVisible=true;
    });
  }

  public dismiss(){
    this.loadingCntrl.dismiss();
    this.overlayVisible=false
  }
}
