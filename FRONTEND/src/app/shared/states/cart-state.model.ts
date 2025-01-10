import { ArticlePreview } from "../models/articlePreview.model";

export class CartItem{
  article: ArticlePreview;
  quantite: number;

  constructor(article: ArticlePreview, quantite: number){
    this.article = article;
    this.quantite = quantite;
  }
}

export class CartStateModel {
    articles: CartItem[] = [];
}