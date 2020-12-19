import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular'
@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.scss'],
})
export class LoginRegComponent implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}


  navigateToLogin(){
    this.navCtrl.navigateForward('reglogin/login')
  }
}
