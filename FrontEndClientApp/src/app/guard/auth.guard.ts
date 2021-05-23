import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginregService } from '../services/loginreg.service';
import { catchError, map } from 'rxjs/operators'
import { SharedService } from '../services/shared.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sharedService:SharedService,private authService: LoginregService, private navCntrl: NavController, private localStorage: LocalStorageService) { }


  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {
    if (this.localStorage.get('access_token')) {
      return this.authService.authToken().pipe(map(
        res => {
          /**
           * if token is valid navigate to home
           * or else proceed to login page 
           */
          if (res.user) {
            this.sharedService.username.next(res.user.name);
            this.navCntrl.navigateForward('home/accountinfo/logout')
            return false;
          } else {
            this.sharedService.username.next('Guest');
            return true;
          }
        }),catchError((e:any)=>{
          this.sharedService.username.next('Guest');
          console.log("true 2")
          return of(true)
        }));
    }
    else{
      this.sharedService.username.next('Guest');
      console.log("true 3")
      return of(true);
    }
  }

}
