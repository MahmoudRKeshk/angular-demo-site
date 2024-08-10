import { AuthService } from './../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage !: string;
  isFailed : boolean = false;
  isLoading : boolean = false;

  constructor(private _AuthService : AuthService , private _Router : Router){

  }

  LoginForm : FormGroup = new FormGroup({
    email : new FormControl(
      null,
      [Validators.required, Validators.email]
    ) , 
    password : new FormControl(
      null ,
      [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*[A-Z])(?=.*\d)/)]
    ) , 
  })

  submitLogin(){
    this.isLoading = true;

    this._AuthService.LoginUser(this.LoginForm.value).subscribe({
      next : (res : any)=>{
        // 1. UI changes
        this.isLoading = false;
        this.isFailed = false;

        //3. Token 
        localStorage.setItem("userToken" , res.token);
        this._AuthService.userInform();

        //changing navigation
        this._Router.navigate(['/home']);

        
      },
      error : (err)=>{
        this.isFailed = true;
        this.isLoading = false;
        this.errorMessage = err.error.message;
      }
    })
  }
}
