import { Component, Input } from '@angular/core';
import { ArticlePreview } from '../../../shared/models/articlePreview.model';
import { AddArticle } from '../../../shared/actions/cart-action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-article-preview',
  standalone: false,
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.css'
})
export class ArticlePreviewComponent {

  constructor(private store: Store){}

  @Input() article!: ArticlePreview;
  link: string = "/article";

  addArticle(){
    this.store.dispatch(new AddArticle(this.article));
  }
}
