
import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { MapService } from '../map/map.service';
import { CamelizePipe } from 'ngx-pipes';
import { CommonModule } from '@angular/common';
import { ApiKey} from '../../config/dev';



@NgModule({
  declarations: [
      MapComponent,
      
  ],
  exports: [
    MapComponent
  ],
  imports: [
    
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDQg6_JgzGPla4nwH_hTso0c5l5vRUokVY';
      }),
      CommonModule


  ],
  providers: [
    MapService,
    CamelizePipe,

  ],
 
})
export class MapModule { }
