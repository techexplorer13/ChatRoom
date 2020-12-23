import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular'
import { LoginregService } from '../services/loginreg.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.scss'],
})
export class LoginRegComponent implements OnInit {

  userForm: FormGroup;

  constructor(public navCtrl: NavController,public regService:LoginregService,private alert:AlertController) {
    this.userForm = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',Validators.required)
    })
  }

  ngOnInit() { 
   
  }


  navigateToLogin() {
    this.navCtrl.navigateForward('reglogin/login')
  }

  onSubmit(){
   this.regService.register(this.userForm.value).subscribe(res=>{
       if(res.usrnm && res._id){
           this.presentAlert();
       }
    })
  }

  async presentAlert() {
    const alert :HTMLIonAlertElement = await this.alert.create({
      cssClass: 'alertSuccess',
      message: '<span class="alertMsg" >Registration Success !!</span>',
      buttons: ['OK']
    });

    alert.present();
    alert.onDidDismiss().then(()=>{
      this.navCtrl.navigateForward('reglogin/login')
    })
  }
}
