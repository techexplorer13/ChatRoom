import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginregService } from '../services/loginreg.service';
import { catchError, map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SessionactiveGuard implements CanActivate {

  constructor(private localStorage: LocalStorageService,private authService: LoginregService, private navCntrl: NavController) { }

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {
    if (this.localStorage.get('access_token')) {
       
       this.authService.authToken().pipe(map(
        res => {
          /**
           * if token is valid navigate to home
           * or else proceed to login page 
           */
          if (res.user) {
            console.log('enter1')
            this.navCntrl.navigateForward(['home/accountinfo/logout'])
            return of(false);
          } else {
            console.log(2)
            return of(true);
          }
        }),catchError((e:any)=>{
          console.log("true 2")
          return of(true)
        }));
    }else{
      return of(true);
    }
  }
  
}
