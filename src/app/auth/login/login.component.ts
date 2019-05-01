import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = "";

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private activeatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.initForm();
    this.activeatedRoute.params.subscribe((params) => {
      if(params['registered']=== 'success'){
        this.notifyMessage = 'You have been succesfully registered, you can login now';
      }
    })
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
    (errorResponse)=> {
      this.errors = errorResponse.error.errors;
    })
  }
}
