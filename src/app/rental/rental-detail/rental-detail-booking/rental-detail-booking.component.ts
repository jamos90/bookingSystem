import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model';
import { Rental } from '../../shared/rental.model';
import { HelperService } from '../../../common/service/helper.service';
import { BookingService } from '../../../booking/shared/booking.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment'



@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental
  @ViewChild(DaterangePickerComponent)
  private picker = DaterangePickerComponent
 
  newBooking: Booking;
  modalRef:any

    // see original project for full list of options
    // can also be setup using the config service to apply to multiple pickers
    public options: any = {
      locale: { format: Booking.DATE_FORMAT },
      alwaysShowCalendars: false,
      opens: 'left',
      autoUpdateInput: false,
      isInvalidDate: this.checkForInvalidDates.bind(this)
    };

  constructor(private helper: HelperService,
    private modalService: NgbModal,
    private bookingService: BookingService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
    ) {
      this.toastr.setRootViewContainerRef(vcr);
     }

  public daterange: any = {};
  public bookedOutDates: any[] = []
  public errors: any[] = []

  ngOnInit() {
    this.getBookedOutDates();
    this.newBooking = new Booking();
    console.log(this.picker);
  }

  private checkForInvalidDates(date) {

    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) ||  date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {

    const bookings: Booking[] = this.rental.bookings;

    if(bookings.length > 0 && bookings) {
      bookings.forEach((booking: Booking)=>{
      console.log(booking);
      const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt)
       //destructurising allows you to break down the date range array into its elemets and push those into the bookedout dates array. Otherwise 
       //bookedOutDates would be an array of arrays.
      this.bookedOutDates.push(...dateRange)
        console.log(this.bookedOutDates);
      })
    }
  }
  
  public openConfirmModal(content) {
    console.log('reserving rental', this.newBooking);
    this.modalRef = this.modalService.open(content);

  }

  private addNewBookedOutDates(bookingData:any) {
    const updatedDateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...updatedDateRange);
  }

  private reestDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('')
  }

  public createBooking() {
    console.log('booking being created');
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData)=>{
        this.addNewBookedOutDates(bookingData);
        console.log(bookingData);
        this.reestDatePicker();
        this.newBooking = new Booking();
        this.modalRef.close();
        this.toastr.success('Booking has been sucessfuly created, check your booking detail in managing section', 'Success!');
      },
      (errorResponse: any)=>{
        console.log(errorResponse);
        this.errors.push(errorResponse.error.errors);
        console.log(this.errors);
      }
    );
  }



    public selectedDate(value: any, datepicker?: any) {
        this.options.autoUpdateInput = true;
        this.newBooking.startAt = this.helper.formatBookingDate(value.start);
        this.newBooking.endAt = this.helper.formatBookingDate(value.end);
        this.newBooking.days = -(value.start.diff(value.end, 'days'));
        this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;

        console.log(this.newBooking);

        // or manupulat your own internal property
        this.daterange.start = value.start;
        this.daterange.end = value.end;
        this.daterange.label = value.label;
    }
}

