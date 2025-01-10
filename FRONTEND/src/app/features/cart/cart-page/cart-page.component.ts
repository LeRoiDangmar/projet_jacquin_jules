import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngxs/store';
import { inject } from '@angular/core';
import { ArticlePreview } from '../../../shared/models/articlePreview.model';
import { AddArticle, DelArticle } from '../../../shared/actions/cart-action';
import { CartState } from '../../../shared/states/cart-state';
import { Observable } from 'rxjs';
import { CartItem } from '../../../shared/states/cart-state.model';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  constructor(private store: Store) {}

  liste$: Observable<CartItem[]> = inject(Store).select(CartState.getListeArticles);
  prix$: Observable<number> = inject(Store).select(CartState.getPriceArticles);

  ngOnInit() {
  }

  delArticle(c: ArticlePreview): void {
    this.store.dispatch(new DelArticle(c));
  }

  addArticle(c: ArticlePreview){
    this.store.dispatch(new AddArticle(c));
  }

  liste(){
    console.log(this.liste$);
  }
}
