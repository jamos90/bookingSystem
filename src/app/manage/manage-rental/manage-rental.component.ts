import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RentalService } from '../../rental/shared/rental.service';
import { Rental } from '../../rental/shared/rental.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'bwm-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {
  
  rentals: Rental[];
  rentalDeleteIndex: number;

  constructor( 
    private rentalService:RentalService, 
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
    ) 
    {
      this.toastr.setRootViewContainerRef(vcr);
    } 

  ngOnInit() {
    const userRentals = this.rentalService.getUserRentals()
    userRentals.subscribe(
      (data: Rental[])=>{
     
        this.rentals = data;
    }),
    (errorResponse:HttpErrorResponse)=>{
      this.toastr.error(errorResponse.error.errors[0].detail, 'Failed!');
    }    
  }

  deleteRental(rentalId:string) {
  
    const deleteRental = this.rentalService.deleteRental(rentalId)

    deleteRental.subscribe(()=>{
      this.rentals.splice(this.rentalDeleteIndex,1);
      this.rentalDeleteIndex = undefined;
    }),
    (errorResponse:HttpErrorResponse)=>{      
      this.toastr.error(errorResponse.error.errors[0].detail, 'Failed!');
      
    }
  }


}
