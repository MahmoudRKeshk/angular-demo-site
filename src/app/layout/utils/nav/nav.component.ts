import {Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isLogedIn : boolean = false;

  constructor(private _AuthService : AuthService, private _Router : Router){

  }

  ngOnInit(){
    this._AuthService.userDecoded.subscribe(()=>{
      if(this._AuthService.userDecoded.getValue() == null){
        this.isLogedIn = false;
        
      }else {
        this.isLogedIn = true;
      }
    })
  }

  logout(){
    console.log("hello");
    
      localStorage.removeItem("userToken");
      localStorage.removeItem("currentPage");
      this._AuthService.userDecoded.next(null);
      this._Router.navigate(['/login'])
  }

}
