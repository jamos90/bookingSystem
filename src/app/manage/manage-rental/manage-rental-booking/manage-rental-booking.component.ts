import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'bwm-manage-rental-booking',
  templateUrl: './manage-rental-booking.component.html',
  styleUrls: ['./manage-rental-booking.component.scss']
})

export class ManageRentalBookingComponent implements OnInit {

  @Input() rentalBookings: any;

  bookings = this.rentalBookings;

  constructor(public modalService: NgbModal) { }

  ngOnInit() {
   
  }

  

}
