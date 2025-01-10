import { ArticlePreview } from "../models/articlePreview.model";
import { CartItem } from "../states/cart-state.model";

export class AddArticle {
  static readonly type = '[Article] Add';

  public item: CartItem;
  constructor(public payload: ArticlePreview) {
    this.item = new CartItem(payload, 1) 
    console.log(payload);
  }
}

export class DelArticle {
  static readonly type = '[Article] Del';

  constructor(public payload: ArticlePreview) {}
}
