import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Booking } from '../shared/booking.model'
import { Observable } from "rxjs";

@Injectable()
export class BookingService  {

    constructor(private http: HttpClient){};

    public createBooking(bookingData:Booking): Observable<any> {
        console.log('getting to service');
        console.log(bookingData);
        return this.http.post('/api/v1/bookings', bookingData);
    }


}