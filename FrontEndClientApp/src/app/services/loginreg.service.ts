import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginregService {

  constructor(private http:HttpClient,private localStorageService:LocalStorageService) { }
  
  public register(user:any):Observable<any>{
    return this.http.post('http://localhost:3000/users',user);
  }

  public login(loginInfo:any):Observable<any>{
    return this.http.post('http://localhost:3000/users/login',loginInfo);
  }

  public authToken():Observable<any>{
    console.log("Calling api to check if token is valid "+ this.localStorageService.get('access_token'))
    let token={"authorization":"Bearer " + this.localStorageService.get('access_token')}

    return this.http.post('http://localhost:3000/users/getUserAuthentication',token)
  }
}
