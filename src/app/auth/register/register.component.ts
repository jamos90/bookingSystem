import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors: any[] = [];

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    
  }

  register() {
    this.auth.register(this.formData).subscribe(
      () => {
        //on successful regitration uses router to navigate to the login page.
        this.router.navigate(['/login', {registered: 'success'}])
      },
      //handles errors from the server. Reasigns our errors array to the error response to be displayed 
      //on the view.
      (errorResponse)=>{
        this.errors = errorResponse.error.errors;
        
      }
    )
  }

}
