
import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { MapService } from '../map/map.service';
import { CamelizePipe } from 'ngx-pipes';
import { ApiKey }  from '../../config/dev';
import { CommonModule } from '@angular/common';

const key = new ApiKey;
const apiKey = key.key;

@NgModule({
  declarations: [
      MapComponent,
      
  ],
  exports: [
    MapComponent
  ],
  imports: [
    
    AgmCoreModule.forRoot({
        apiKey: apiKey
      }),
      CommonModule


  ],
  providers: [
    MapService,
    CamelizePipe,

  ],
 
})
export class MapModule { }
