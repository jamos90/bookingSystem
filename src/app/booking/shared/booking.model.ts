import  { Rental } from '../../rental/shared/rental.model';

export class Booking {
    //static means that you do not need to create an instance of a booking to reference the variable.
    static readonly DATE_FORMAT = "Y-MM-DD"


    id: string;
    startAt: string;
    endAt: string;
    totalPrice: number;
    guests: number;
    days: number;
    createdAt: string;
    rental: Rental;
}