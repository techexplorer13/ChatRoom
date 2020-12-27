import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from '../configure/serviceurls';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  private httpHeaders:HttpHeaders=new HttpHeaders().append("x-rapidapi-key", "SD9BkTcTYymsh4MyQs90mUTd9jFwp1MElTejsn6gBjrBlzN3KC")

  getVideos(searchTxt:string):Observable<any>{
    return this.http.post(Urls.video_search_url+searchTxt,{headers:this.httpHeaders});
  }

  getTrendingVideos():Observable<any>{
    return this.http.get(Urls.trending_video_url,{headers:this.httpHeaders})
  }
}
