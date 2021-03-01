import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies:any
  constructor(private dtservice:DataService,private util:UtilityService) { }

  ngOnInit() {
    this.callInit();
  }


  async callInit() {
    await this.util.presentLoader();
    this.dtservice.getTredingMovies().subscribe(res=>{
      this.movies=res[0];
      this.util.dismiss()
    })
  }

}
