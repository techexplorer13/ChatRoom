import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from '../configure/serviceurls';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  
  private httpHeaders:HttpHeaders=new HttpHeaders().
  append("x-rapidapi-key", "2644b7e3ecmsh8af7be1e3ac673fp1d8b7cjsnb9e085c52980")
  .append("x-rapidapi-host", "imdb8.p.rapidapi.com")
                                                                              
  getSearchData(searchTxt:string):Observable<any>{
    return this.http.get(Urls.imdb_search_url+searchTxt,{headers:this.httpHeaders});
  }

  getTrendingShows():Observable<any>{
    return this.http.get(Urls.imdb_upcoming_tv_shows,)
  }

  getNews():Observable<any>{
    return this.http.get(Urls.imdb_news,{headers:this.httpHeaders})
  }

}
