
import { NgModule } from '@angular/core';
import {MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
      MapComponent 
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBpd58imJ4igvFwHKqTyynIdZJqbDO7o0'
      })

  ],
  providers: [],
 
})
export class MapModule { }
