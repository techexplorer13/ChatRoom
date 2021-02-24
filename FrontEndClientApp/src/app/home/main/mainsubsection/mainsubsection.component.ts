import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainsubsection',
  templateUrl: './mainsubsection.component.html',
  styleUrls: ['./mainsubsection.component.scss'],
})
export class MainsubsectionComponent implements OnInit {

  @Input('subsection') subsection;
  
  constructor() { }

  ngOnInit() {}

}
