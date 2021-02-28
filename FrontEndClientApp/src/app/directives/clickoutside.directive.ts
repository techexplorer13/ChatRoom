import { Directive, ElementRef, EventEmitter, Output, HostListener, ViewChild, Input } from '@angular/core';
import { MainComponent } from '../home/main/main.component';

@Directive({
  selector: '[clickOutside]'
})
export class ClickoutsideDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('document:click', ['$event.target'])
  public click(target) {
    const clickedInside = this.el.nativeElement.contains(target);
    if (clickedInside) {
      document.getElementById('searchBar').style.width = "200px";
    }
    else {
      document.getElementById('searchBar').style.width = "42px";
      (<HTMLInputElement>document.getElementById('searchBar')).value = '';
    }
  }
}
