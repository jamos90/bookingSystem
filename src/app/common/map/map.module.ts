
import { NgModule } from '@angular/core';
import {MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { MapService } from '../map/map.service';
import { CamelizePipe } from 'ngx-pipes';
import { ApiKey}  from '../../config/dev';

const key = new ApiKey;

@NgModule({
  declarations: [
      MapComponent,
      
  ],
  exports: [
    MapComponent
  ],
  imports: [
    
    AgmCoreModule.forRoot({
        apiKey: key.key
      })


  ],
  providers: [
    MapService,
    CamelizePipe,
    

  ],
 
})
export class MapModule { }
