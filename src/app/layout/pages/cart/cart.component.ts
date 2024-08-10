import { afterNextRender, Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(){
    afterNextRender(()=>{
      localStorage.setItem('currentPage', '/cart')
    })
  }
}
