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
    console.log( typeof(this.location));
    this.mapService.getGeoLocation(this.location).subscribe((coordinates)=>{
      console.log('hitting mapReady', coordinates);
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
      this.ref.detectChanges();
    }, ()=> {
      this.isPositionError = true;
    })

  }

}
