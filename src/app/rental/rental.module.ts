import {NgModule} from '@angular/core';
import{CommonModule} from '@angular/common';

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';

@NgModule({
    declarations: [
        RentalListComponent,
        RentalListItemComponent,
        RentalComponent
    ],
    imports: [
        CommonModule
        
    ]
})

export class RentalModule {

}