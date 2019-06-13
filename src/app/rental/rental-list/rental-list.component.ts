import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { createPipeInstance } from '@angular/core/src/view/provider';

@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  rentals: Rental[] = [];
  errors: any[] = [];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
   const rentalObservable = this.rentalService.getRentals();
   rentalObservable.subscribe(
     (data: Rental[])=> {
      this.rentals = data;
    },
    (error)=>{
      console.error(`something has gone wrong: ${error}`);
      this.errors = error.error.errors
      console.error(this.errors);

    });
  }

}
