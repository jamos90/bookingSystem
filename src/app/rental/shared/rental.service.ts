import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{ Rental } from './rental.model';

@Injectable()
export class RentalService {

    private rentals: Rental[] = [
        {
          id: '1',
          title: 'Central Apartnemnt',
          city: 'Tornoto',
          street: 'Howard Park Ave',
          category: 'apartment',
          image: 'http//via/placeholder.com/350*250',
          bedrooms: 3,
          description: 'Very nice apartment',
          dailyRate: 34,
          shared: false,
          createdAt: "05/04/19"
        },
        {
          id: '2',
          title: "Central Apartment 2",
          city: "San Francisco",
          street: "Main street",
          category: "condo",
          image: "http://via.placeholder.com/350x250",
          bedrooms: 2,
          description: "Very nice apartment",
          dailyRate: 12,
          shared: true,
          createdAt: "24/12/2017"
        },
        {
          id: '3',
          title: "Central Apartment 3",
          city: "Bratislava",
          street: "Hlavna",
          category: "condo",
          image: "http://via.placeholder.com/350x250",
          bedrooms: 2,
          description: "Very nice apartment",
          dailyRate: 334,
          shared: true,
          createdAt: "24/12/2017"
        },
        {
          id: '4',
          title: "Central Apartment 4",
          city: "Berlin",
          street: "Haupt strasse",
          category: "house",
          image: "http://via.placeholder.com/350x250",
          bedrooms: 9,
          description: "Very nice apartment",
          dailyRate: 33,
          shared: true,
          createdAt: "24/12/2017"
      }
    ]

    public getRentals(): Observable<Rental[]>{
       return new Observable<Rental[]>((observer)=> {
            setTimeout(()=> {
                observer.next(this.rentals);
            }, 1000);

            setTimeout(()=> {
                observer.error('Error retriving data');
            }, 2000);

            setTimeout(()=> {
              observer.complete();
            }, 3000)
           
        }
      ); 
    
    }
  public getRentalById(rentalId:string): Observable<Rental> {
    return new Observable<Rental>((oberver)=>{
      setTimeout(()=> {
        const foundRental = this.rentals.find((rental)=>{
          return rental.id === rentalId
        })
        oberver.next(foundRental);
      }, 500)
    });
  }

}