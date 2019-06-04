import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../rental/shared/rental.service';
import { Rental } from '../../rental/shared/rental.model';


@Component({
  selector: 'bwm-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {
  
  rentals: Rental[] = [];

  constructor( private rentalService:RentalService) { }

  ngOnInit() {
    const userRentals = this.rentalService.getUserRentals()
    userRentals.subscribe(
      (data: Rental[])=>{
        console.log(data);
        this.rentals = data;
        console.log('this is the rentals', this.rentals);
    }),
    ()=>{

    }    
  }



}
