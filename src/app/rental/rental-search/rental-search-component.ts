import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TouchSequence } from 'selenium-webdriver';


@Component({
  selector: 'bwm-rental-search-component',
  templateUrl: './rental-search-component.html',
  styleUrls: ['./rental-search-component.component.scss']
})
export class RentalSearchComponent implements OnInit {

  city: string;
  rentals: Rental[] = [];
  errors: HttpErrorResponse[] = []

  constructor(private rentalService: RentalService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe((params)=>{
      this.city = params['city'];
      this.getRentals();
    }) 
  }

  getRentals() {
    //resets search data before getting new informaion
    this.errors = [];
    this.rentals = [];

    this.rentalService.getRentalByCity(this.city).subscribe(
      (rentals:Rental[])=>{
        this.rentals = rentals;
        

      },
      (error: HttpErrorResponse)=>{
        this.errors = error.error.errors
      }
    ) 
  }

}
