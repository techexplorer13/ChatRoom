import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  searchValue: any;
  searchForm: FormGroup;

  searchresult: any;
  searchField: FormControl;
  trending: any


  selectedCat: any;

  constructor(private fb: FormBuilder,private dtservice: DataService) {
    this.searchField = new FormControl();
    this.searchForm = fb.group({ search: this.searchField });


    this.searchField.valueChanges.pipe(debounceTime(5000),switchMap((value: string) => {
      if (value.length > 2) { 
        console.log("hi")
        return this.dtservice.getSearchData(value) }
      else {
        new Observable
      }
    })).subscribe(result => {
      console.log(result)
      this.searchresult = result;
    })
  }

  ngOnInit() {
    this.dtservice.getTrendingShows().subscribe(res => {
      this.trending = res
    })
     
  }

}
