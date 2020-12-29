import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { LoadingController } from '@ionic/angular';
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


  test: any = [{
    "i": { "height": "1500", "imageUrl": "https://m.media-amazon.com/images/M/MV5BODIyNzk5NDg5M15BMl5BanBnXkFtZTgwMTE5NjA5MjI@._V1_.jpg", "width": "1012" },
    "id": "tt5071412",
    "l": "Ozark",
    "q": "TV series",
    "s": "Jason Bateman, Laura Linney"
  }, {
    "i": { "height": "1500", "imageUrl": "https://m.media-amazon.com/images/M/MV5BMTI2MDE2MDA0M15BMl5BanBnXkFtZTcwOTM1MzU1MQ@@._V1_.jpg", "width": "1012" },
    "id": "tt5071412",
    "l": "Ozark",
    "q": "TV series",
    "s": "Jason Bateman, Laura Linney"
  }];

  constructor(private fb: FormBuilder, private dtservice: DataService, private loadingCntrl: LoadingController) {
    this.searchField = new FormControl();
    this.searchForm = fb.group({ search: this.searchField });


    this.searchField.valueChanges.pipe(debounceTime(2000), switchMap((value: string) => {
      if (value.length > 2) {
        this.presentLoading();
        return this.dtservice.getSearchData(value)
      }
      else {
        return null
      }
    })).subscribe(result => {
      //filter results which has images
      this.searchresult = result.d.filter(val => val.i)
      this.loadingCntrl.dismiss();
      console.log(this.searchresult)
    })
    // this.searchresult=this.test
  }

  ngOnInit() {
    this.dtservice.getTrendingShows().subscribe(res => {
      this.trending = res
    })

  }


  presentLoading() {
      this.loadingCntrl.create({ spinner: "bubbles" }).then(val=>{
        val.present();
      })
  }

}
