import { Component } from '@angular/core';
import { FetcherService } from '../../../shared/services/fetcher.service';
import { Subscription } from 'rxjs';
import { ArticleFull } from '../../../shared/models/articleFull.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    standalone: false,
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrl: './article.component.css'
})
export class ArticleComponent {
  constructor(private fetcherService: FetcherService, private route: ActivatedRoute){}
  private subscription: Subscription = new Subscription();

  articlefull: ArticleFull = {
    id: '',
    nom: '',
    prix: 0,
    note: 0,
    id_categorie: '',
    en_avant: false,
    images: [],
    poids: 0,
    description: '',
    dimensions: ''
  };

  article: string | null = null;

  ngOnInit() {
    const routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const newArticle = params.get('id');
      if (newArticle !== this.article) {
        this.article = newArticle;
        this.FetchArticle();
      }
    });
  }

  FetchArticle(){
    const fetchSubscription = this.fetcherService.fetchArticleFull(this.article || "").subscribe({
      next: (data) => {
        this.articlefull = data;
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
      }
    });
    this.subscription.add(fetchSubscription);
  }
}
 