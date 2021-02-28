import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'searchresults',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Input("searchresult") searchresult:any;

  constructor() { }

  ngOnInit() {}

}
