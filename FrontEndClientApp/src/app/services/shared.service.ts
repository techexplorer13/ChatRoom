import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  username=new BehaviorSubject<String>('Guest');
  
  constructor() { }

  getSubject():BehaviorSubject<String>{
    return this.username
  }
}
