import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { Router } from '@angular/router';
import { RentalService } from '../shared/rental.service'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental: Rental;
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = []
  

  constructor( private rentalService: RentalService,
                private router: Router) { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
    this.errors = [];
  }

  createRental() {
    
    this.rentalService.createRental(this.newRental).subscribe(
      (rental:Rental)=>{
        this.router.navigate([`/rentals/${rental._id}`])

      },
      (errorResponse:HttpErrorResponse)=>{
        this.errors = errorResponse.error.errors
       
      }
    )
  }

  handleImageChange() {
    this.newRental.image = 'src/assets/images/create-rental.jpg'
  }

}
