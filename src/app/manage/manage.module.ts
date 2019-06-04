import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageComponent } from './manage.component';


const routes: Routes = [
    { path: 'manage',
    component: ManageComponent,
    children: [
        {
        path:'rentals',
        component: ManageRentalComponent
        },
        {
        path:'bookings',
        component: ManageBookingComponent
        }
    ]
    },
]

@NgModule({
    declarations:[
        
        ManageComponent,
        ManageRentalComponent,
        ManageBookingComponent

    ],
    imports: [
        RouterModule.forChild(routes)

    ],
})

export class ManageModule{}