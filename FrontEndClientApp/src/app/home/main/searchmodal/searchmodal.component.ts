import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { UtilityService } from 'src/app/services/utility.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-searchmodal',
  templateUrl: './searchmodal.component.html',
  styleUrls: ['./searchmodal.component.scss'],
})
export class SearchmodalComponent implements OnInit {

  searchForm: FormGroup;
  searchField: FormControl;
  searchresult: any;

  constructor(private modalCntrl: ModalController, private fb: FormBuilder,
    private dtservice: DataService, private utility: UtilityService) {
    this.searchField = new FormControl();
    this.searchForm = this.fb.group({ search: this.searchField });

    this.searchField.valueChanges.pipe(debounceTime(500), switchMap((value: string) => {
      if (value.length > 2) {
        this.utility.presentLoader();
        return this.dtservice.genericSearch(value)
      }
      return of([])
    })
    ).subscribe(result => {
      this.searchresult = result;
      console.log(this.searchresult)
      if (this.utility.overlayVisible) {
        this.utility.dismiss()
      }
    })
  }

  ngOnInit() { }

  popModalOut() {
    this.modalCntrl.dismiss()
  }

}
