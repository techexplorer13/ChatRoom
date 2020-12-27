import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  searchField: FormControl;
  searchForm: FormGroup;

  searchresult: any;
  trendingVideosResult: any


  selectedCat: any;

  constructor(private fb: FormBuilder, private dtservice: DataService, private sanitizer: DomSanitizer) {
    this.searchField = new FormControl();
    this.searchForm = fb.group({ search: this.searchField });


    this.searchField.valueChanges.pipe(switchMap((value: string) => {
      if (value.length > 2) { return this.dtservice.getVideos(value) }
      else {
        new Observable
      }
    })).subscribe(result => {
      this.searchresult = result;
    })
  }

  ngOnInit() {
    this.dtservice.getTrendingVideos().subscribe(res => {
      this.trendingVideosResult = res
    })

    document.getElementById('searchicon').addEventListener("click",function(){
      document.getElementById('searchBar').style.width='200px'
    })
  }

  showSection(event) {
    this.selectedCat = this.trendingVideosResult.categories.filter(cat => cat.title == event.target.value)
    console.log(this.selectedCat)
  }

}
