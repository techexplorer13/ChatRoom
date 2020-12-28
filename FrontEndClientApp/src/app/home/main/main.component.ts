import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { debounceTime, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  searchValue: any;
  searchForm: FormGroup;

  searchresult: any;
  searchField: FormControl;
  trending: any

 constructor(private fb: FormBuilder,private dtservice: DataService) {
    this.searchField = new FormControl();
    this.searchForm = fb.group({ search: this.searchField });


    this.searchField.valueChanges.pipe(debounceTime(5000),switchMap((value: string) => {
      if (value.length > 2) { 
        return this.dtservice.getSearchData(value) }
      else {
        return null
      }
    })).subscribe(result => {
      //filter results which has images
      this.searchresult = result.d.filter(val=>val.i)
    })
  }

  ngOnInit() {
    this.dtservice.getTrendingShows().subscribe(res => {
      this.trending = res
    })
     
  }

}
