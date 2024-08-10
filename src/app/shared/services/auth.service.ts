import { HttpClient } from '@angular/common/http';
import { Injectable, afterNextRender } from '@angular/core';
import {IUserRegister, IUserLogin} from '../models/UserData'
import { Observable } from 'rxjs/internal/Observable';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDecoded : BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient, private _Router : Router) 
  {
    afterNextRender(()=>{
      if(localStorage.getItem('userToken') != null){
        this.userInform();
        let currenPage = localStorage.getItem('currentPage')
        _Router.navigate([currenPage])
      }
    })
  }
  
  RegistedUser(_IUserRegister : IUserRegister ) : Observable<any>
  {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup",_IUserRegister)
  }

  LoginUser(_IUserLogin : IUserLogin){
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin",_IUserLogin)
  }

  userInform(){
    this.userDecoded.next(jwtDecode(JSON.stringify(localStorage.getItem("userToken"))));
  }
}
