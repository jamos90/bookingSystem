import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';


@Injectable()
export class MapService {

    private geoCoder;

    private locationCache: any = {}

    constructor(private camelizePipe: CamelizePipe) {}

    //helper function to camelize a value. Uses the camelize pipe from ngx-pipes.
    private camelize(value:string): string {
        return this.camelizePipe.transform(value);
    }


    private cacheLocation(location: string, coordiantes: any) {
        const camelizeLocation = this.camelize(location);

        this.locationCache[camelizeLocation] = coordiantes;
    }

    private isLocationCached(location): boolean {
        return this.locationCache[this.camelize(location)];
    }
 
    public geoCodeLocation(location:string): Observable<any> {
        console.log('im getting here');
        this.geoCoder = new (<any>window).google.maps.Geocoder()
        return new Observable((oberver)=>{
            //checks is we already have a location cached so we don't have to make unncesary calls to the API.
            if(this.isLocationCached(location)){
                //reuturn location from cache.
                oberver.next(this.locationCache[this.camelize(location)])
            }
            else {
                this.geoCoder.geocode({address: location}, (result, status)=>{
                    if (status === 'OK') {
                        const geomerty = result[0].geometry.location;
    
                        const coordiantes = {lat: geomerty.lat(), lng: geomerty.lng()};
    
                        this.cacheLocation(location, coordiantes);
    
                        oberver.next(coordiantes);
                    }
                    else {
                        oberver.error('Location could not be geocoded');
                    }
                })
            } 
        })
    }

}