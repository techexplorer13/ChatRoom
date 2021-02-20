import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { LoadingController, ModalController } from '@ionic/angular';
import { debounceTime, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { NewsmodalComponent } from './newsmodal/newsmodal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit,OnDestroy {
  searchValue: any;
  searchForm: FormGroup;

  searchresult: any;
  searchField: FormControl;
  trending: any

  latestnews: any = {};

  slideIndex: any = 0;
  interval=null;
  spinnerVisible=null;

  constructor(private modalCntrl: ModalController, private fb: FormBuilder, private dtservice: DataService, private loadingCntrl: LoadingController) {
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
    this.presentLoading();
    this.dtservice.getTrendingShows().subscribe(res => {
      this.trending = res;
      console.log(this.trending[0].shows)
      this.interval=setInterval(() => this.slideshow(), 2000)

    })
  }

  presentLoading() {
    this.loadingCntrl.create({
      spinner: "crescent",
      message: "Please wait.."
    }).then(val => {
      val.present();
      this.spinnerVisible=true;
    })
  }


  openModal(item: any) {
    this.modalCntrl.create({
      component: NewsmodalComponent,
      componentProps: {
        'item': item
      }
    }).then((res) => {
      res.present()
    })

  }

  slideshow() {
    let slides = document.getElementById('slides').children;
    let dots = document.getElementById('dotslist').children;

    for (let i = 0; i < slides.length; i++) {
      if (i === this.slideIndex) {
        (<HTMLElement>slides[i]).style.display = "block";
        (<HTMLElement>dots[i]).classList.add("active")
      }
      else {
        (<HTMLElement>slides[i]).style.display = "none";
        (<HTMLElement>dots[i]).classList.remove("active")
      }
    }
    (<HTMLElement>document.querySelector('.sliderWindow')).style.display = 'flex';
    this.slideIndex = this.slideIndex + 1;
    if (this.slideIndex == slides.length) {
      this.slideIndex = 0;
    }
    if(this.spinnerVisible){
      this.loadingCntrl.dismiss()
      this.spinnerVisible=false
    }
  }

  ngOnDestroy(){
    clearInterval(this.interval)
    this.slideIndex=0;
  }
}
