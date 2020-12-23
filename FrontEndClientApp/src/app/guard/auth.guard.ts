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


  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {


    if (this.localStorage.get('access_token')) {
      return this.authService.authToken().pipe(map(
        res => {
          if (res == "Valid") {
            this.navCntrl.navigateForward('home')
            return false;
          } else {
            return true;
          }
        }),catchError((e:any)=>{
          return of(true)
        }));
    }
    else{
      return of(true);
    }
  }

}
