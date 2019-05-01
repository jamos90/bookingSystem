import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    //Validators required will force the form field to be required
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    })
  }

  isInvalidFrom(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid 
    && (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched)
  }

  isRequired(fieldName):boolean {
    return this.loginForm.controls[fieldName].errors.required
  }

  login() {
    return this.authService.login(this.loginForm.value).subscribe(
      (token)=>{
      this.router.navigate(['/rentals'])
    },
    (errors)=> {
      console.error('Im the error',errors.error);
    })
  }
}
