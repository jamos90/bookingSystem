import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};

  constructor(private auth: AuthService) { }

  ngOnInit() {
    
  }

  register() {
    this.auth.register(this.formData).subscribe(
      () => {
        console.log('sucesss')
      },
      (errorResponse)=>{
        console.log(errorResponse);
      }
    )
  }

}
