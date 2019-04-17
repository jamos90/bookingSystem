import { Component, OnInit, Input } from '@angular/core';
import { MapService } from './map.service';


@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location: string;

  lat;
  lng;

  constructor(private mapService: MapService) { }

  

  ngOnInit() {
  }

  public mapReadyHandler() {
    console.log( typeof(this.location));
    this.mapService.geoCodeLocation(this.location).subscribe((coordinates)=>{
      console.log('hitting mapReady', coordinates);
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
    })

  }

}
