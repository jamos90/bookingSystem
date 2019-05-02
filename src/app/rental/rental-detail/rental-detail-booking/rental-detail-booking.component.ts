import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../../shared/rental.model';


@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental
  constructor() { }

  ngOnInit() {
  }

}
