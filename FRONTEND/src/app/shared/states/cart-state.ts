import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { AddArticle, DelArticle } from '../actions/cart-action';
import { CartItem, CartStateModel } from './cart-state.model';
import { ArticlePreview } from '../models/articlePreview.model';
@State<CartStateModel>({
  name: 'articles',
  defaults: {
    articles: [],
  },
})
@Injectable()
export class CartState {
  @Selector()
  static getNbArticles(state: CartStateModel) {
    return state.articles.reduce((total, article) => total + article.quantite, 0);
  }
  @Selector()
  static getPriceArticles(state: CartStateModel) {
    return state.articles.reduce((total, article) => total + article.article.prix * article.quantite, 0);
  }
  @Selector()
  static getListeArticles(state: CartStateModel) {
    console.log(state.articles);
    return state.articles;
  }

  @Action(AddArticle)
  add(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: AddArticle
  ) {
    const state = getState();
    const exist = state.articles.findIndex((item) => item.article.id == payload.id);
    const quantite = 1;
    if (exist !== -1) {
      const updatedItem = new CartItem(payload, state.articles[exist].quantite + 1);
      console.log(updatedItem, exist);
    
      const updatedArticles = state.articles.map((article, index) =>
        index === exist ? updatedItem : article
      );
    
      patchState({
        articles: updatedArticles,
      });
    } else {
      const newItem = new CartItem(payload, 1);
      patchState({
        articles: [...state.articles, newItem]
      });
    }
  }

  @Action(DelArticle)
  del(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: DelArticle
  ) {
    const state = getState();
    const articles = [...state.articles];
    const index = articles.findIndex(
      (x) => x.article.nom === payload.nom && x.article.id === payload.id
    );
  
    if (index !== -1) {
      const currentArticle = articles[index];
  
      if (currentArticle.quantite > 1) {
        const updatedArticle = {
          ...currentArticle,
          quantite: currentArticle.quantite - 1,
        };
        articles[index] = updatedArticle;
      } else {
        articles.splice(index, 1);
      }
  
      patchState({
        articles,
      });
    }
  }
}
