import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bwm-rental-list-item',
  templateUrl: './rental-list-item.component.html',
  styleUrls: ['./rental-list-item.component.scss']
})
export class RentalListItemComponent implements OnInit {
  //Input decorator allows you to pass data from parent to child componets. variable name should match the one in [] in the 
  //html
  @Input() currentRental: any;

  constructor() { }

  ngOnInit() {
  }

}
