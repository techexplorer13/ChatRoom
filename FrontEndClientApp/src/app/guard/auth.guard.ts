import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginregService } from '../services/loginreg.service';
import { catchError, map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginregService, private navCntrl: NavController, private localStorage: LocalStorageService) { }


  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {


    if (this.localStorage.get('access_token')) {
      return this.authService.authToken().pipe(map(
        res => {
          /**
           * if token is valid navigate to home
           * or else proceed to login page 
           */
          if (res == "Valid") {
            this.navCntrl.navigateForward('home')
            console.log("false 1")
            return false;
          } else {
            console.log("true 1")
            return true;
          }
        }),catchError((e:any)=>{
          console.log("true 2")
          return of(true)
        }));
    }
    else{
      console.log("true 3")
      return of(true);
    }
  }

}
