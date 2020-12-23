import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginregService } from 'src/app/services/loginreg.service';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoginFailed:boolean=false

  constructor(public navCtrl: NavController,public regService:LoginregService) {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
  }

  ngOnInit() {}

  back(){
    this.navCtrl.pop()
  }

  login(){
    this.regService.login(this.loginForm.value).subscribe(res=>{
      if(res.access_token){
        this.isLoginFailed=false;
        localStorage.setItem('access_token',res.access_token)
        this.navCtrl.navigateForward('home')
      }
      else{
        this.isLoginFailed=true;
        this.loginForm.reset()
      }
    },
    //below is case of error thrown by api
    ()=>{
      this.isLoginFailed=true;
      this.loginForm.reset()
    });
  }

}
