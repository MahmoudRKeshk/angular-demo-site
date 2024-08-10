import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService, private _Router : Router){

  }
  errorMessage : string = "";
  isFailed : boolean = false;
  isLoading : boolean = false;

  RegisterForm : FormGroup = new FormGroup({
    // name field
    "name": new FormControl(
      null, 
      [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern(/[a-zA-Z]/)]
    ),
    // email field
    "email": new FormControl(
      null,
      [Validators.required, Validators.email]
    ),
    // passwords fields
    "password": new FormControl(
      null,
      [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*[A-Z])(?=.*\d)/)]
    ),
    "rePassword": new FormControl(null),
    // phone field
    "phone": new FormControl(null, 
      [Validators.required, Validators.minLength(11),Validators.maxLength(11),Validators.pattern(/^01\d*$/)])
  },this.passwordMatchValidator);

  

  passwordMatchValidator(g:any){
    if(g.get("password")?.value == g.get("rePassword")?.value){
      return null;
    } else {
      return {passmatch:true};
    }
  }

  submitRegister(){
    this.isLoading = true;
    this._AuthService.RegistedUser(this.RegisterForm.value).subscribe({
      next : (res)=>{
        this.isFailed = false;
        this.isLoading = false;
        this._Router.navigate(['login'])
        
      },
      error : (err)=>{
        this.isFailed = true;
        this.isLoading = false;
        this.errorMessage = err.error.message;
        
      },
      complete() {
          console.log("completed");
          
      },
      
    })
  }
}
