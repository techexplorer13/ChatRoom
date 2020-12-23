import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginregService } from 'src/app/services/loginreg.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoginFailed:boolean=false

  constructor(public navCtrl: NavController,public regService:LoginregService,private localStorage:LocalStorageService) {
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
        this.localStorage.set('access_token',res.access_token)
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
