import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-newsmodal',
  templateUrl: './newsmodal.component.html',
  styleUrls: ['./newsmodal.component.scss'],
})
export class NewsmodalComponent implements OnInit {

  @Input('item') item:string;
  constructor(private modalCntrl:ModalController) { }

  ngOnInit() {

  }

  cancelModal(){
    this.modalCntrl.dismiss()
  }
}
