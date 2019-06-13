import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';


@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location: string;

  isPositionError: boolean = false;

  lat;
  lng;

  constructor(private mapService: MapService,
              private ref: ChangeDetectorRef
            ) { }

  

  ngOnInit() {
  }

  public mapReadyHandler() {
    this.mapService.getGeoLocation(this.location).subscribe((coordinates)=>{
      
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
      this.ref.detectChanges();
    }, ()=> {
      this.isPositionError = true;
      this.ref.detectChanges();
    })

  }

}
