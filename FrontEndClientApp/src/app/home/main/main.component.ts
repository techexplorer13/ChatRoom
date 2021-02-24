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
export class MainComponent implements OnInit,AfterViewInit, OnDestroy {
  searchValue: any;
  searchForm: FormGroup;

  searchresult: any;
  searchField: FormControl;
  trending: any

  latestnews: any = {};
  interval = null;
 

  constructor(private modalCntrl: ModalController, private fb: FormBuilder, private dtservice: DataService, private loadingCntrl: LoadingController) {
    this.searchField = new FormControl();
    this.searchForm = fb.group({ search: this.searchField });


    /**  this.searchField.valueChanges.pipe(debounceTime(2000), switchMap((value: string) => {
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
      })*/
    // this.searchresult=this.test
  }



  ngOnInit() {
    this.callInit()
    
  }

  ngAfterViewInit(){
    setTimeout(()=>{this.slideshow(1)},2000);
  }

  async callInit() {
  await this.loadingCntrl.create({
      spinner: "crescent",
      message: "Please wait.."
    }).then(val => {
      val.present();
    })

    this.fetchInitData();
  }


  private fetchInitData() {
    this.dtservice.getTrendingShows().subscribe(res => {
      this.trending = res;
      console.log(this.trending[0].shows);
      this.loadingCntrl.dismiss();
    });
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

  slideshow(widthMultiplier) {
    let slides = document.getElementById('slides').children;
    let dots = document.getElementById('dotslist').children;
    this.interval=setInterval(()=>{
      if(dots[widthMultiplier-1]){
      dots[widthMultiplier-1].classList.remove('active');
      }
      dots[widthMultiplier].classList.add('active');

      this.slideLeft(slides,widthMultiplier*100);
      widthMultiplier+=1;
      if(widthMultiplier==slides.length){
        clearInterval(this.interval) 
        dots[widthMultiplier-1].classList.remove('active');
        this.slideshow(0);
      }
    },3000);
  }


  slideLeft(slides,width){
      for(let i=0;i<slides.length;i++){
          (<HTMLElement>slides[i]).style.transform=`translateX(-${width}%)`;
      }
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }
}
