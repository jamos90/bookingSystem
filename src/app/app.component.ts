import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  componentTitle = "I am a new component"

  //you do not need to define the clickHandler as a function just as below.
  clickHandler() {
    
  }
}
