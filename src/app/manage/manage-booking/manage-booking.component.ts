import { Component, OnInit } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
import { BookingService } from '../../booking/shared/booking.service';

@Component({
  selector: 'bwm-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  bookings: Booking[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    const userBookings = this.bookingService.getUserBookings();
    userBookings.subscribe(
      (data: Booking[])=>{
        this.bookings = data;   
    },
    (err)=>{
      console.error(`something has gone wrong ${err}`);
    });

  }

}
