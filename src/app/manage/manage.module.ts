import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageComponent } from './manage.component';
import { AuthGuard } from '../auth/shared/auth.guard';


const routes: Routes = [
    { path: 'manage',
    component: ManageComponent,
    children: [
        {
        path:'rentals',
        component: ManageRentalComponent,
        canActivate: [AuthGuard]
        },
        {
        path:'bookings',
        component: ManageBookingComponent,
        canActivate: [AuthGuard]
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
        RouterModule.forChild(routes),
        CommonModule

    ],
    providers: [

    ]
})

export class ManageModule{}