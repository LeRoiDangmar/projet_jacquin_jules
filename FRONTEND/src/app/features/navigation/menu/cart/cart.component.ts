import { Component } from '@angular/core';
import { CartState } from '../../../../shared/states/cart-state';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  nb$: Observable<number> = inject(Store).select(CartState.getNbArticles);
  prix$ : Observable<number> = inject(Store).select(CartState.getPriceArticles);
}
