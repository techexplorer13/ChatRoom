import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginregService {

  constructor(private http:HttpClient) { }
  
  public register(user:any):Observable<any>{
    return this.http.post('http://localhost:3000/users',user);
  }
}
