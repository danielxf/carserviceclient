import { Component } from '@angular/core';

@Component({
  selector: 'app-car-owner-list',
  templateUrl: './car-owner-list.component.html'
})
export class CarOwnerListComponent {
  carOwner: Array<any>;


  constructor() {
  }


  addCarOwner(carOwnerTuple) {
    if (!this.carOwner.includes(carOwnerTuple)) { this.carOwner.push(carOwnerTuple); }
  }
}


