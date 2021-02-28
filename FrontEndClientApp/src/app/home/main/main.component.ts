import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { SearchmodalComponent } from './searchmodal/searchmodal.component';
import { UtilityService } from 'src/app/services/utility.service';
import { ActivatedRoute, GuardsCheckStart } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit,AfterViewInit, OnDestroy {

  trending: any
  latestnews: any = {};
  slideinterval = null;
  username=null;
 

  constructor(private sharedService:SharedService  , private dtservice:DataService,
    private modalCntrl:ModalController,private utility:UtilityService,private route: ActivatedRoute) {}
  

  ngOnInit() {
    this.callInit()
  }

  ngAfterViewInit(){
    setTimeout(()=>{this.slideshow(1)},2000);
    setTimeout(function(){
       (<HTMLElement> document.querySelector('.namelabel')).style.width="70%"
    },500)
  }

  async callInit() {
      await this.utility.presentLoader();
      this.fetchInitData();
  }

  private fetchInitData() {
    this.sharedService.username.subscribe(res=>{
      this.username=res
    })
    this.dtservice.getTrendingShows().subscribe(res => {
      this.trending = res;
      console.log(this.trending[0].shows);
      this.utility.dismiss();
    });
  }

  openSearchModal(item: any) {
    this.modalCntrl.create( {
      component: SearchmodalComponent
        }).then((res) => {
      res.present()
    })
  }


  slideshow(widthMultiplier) {
    let slides = document.getElementById('slides').children;
    let dots = document.getElementById('dotslist').children;
    this.slideinterval=setInterval(()=>{
      if(dots[widthMultiplier-1]){
      dots[widthMultiplier-1].classList.remove('active');
      }
      dots[widthMultiplier].classList.add('active');

      this.slideLeft(slides,widthMultiplier*100);
      widthMultiplier+=1;
      if(widthMultiplier==slides.length){
        clearInterval(this.slideinterval) 
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
    clearInterval(this.slideinterval)
  }
}
