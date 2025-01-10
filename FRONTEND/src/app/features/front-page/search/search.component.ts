import { Component } from '@angular/core';
import { FetcherService } from '../../../shared/services/fetcher.service';
import { Subscription } from 'rxjs';
import { ArticlePreview } from '../../../shared/models/articlePreview.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private fetcherService: FetcherService, private route: ActivatedRoute){}
  private subscription: Subscription = new Subscription();

  articles: ArticlePreview[] = [];
  query: string= ""

  ngOnInit() {
    const routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const newQuery = params.get('query');
      if (newQuery !== this.query && newQuery != null) {
        this.query = newQuery;
        this.FetchArticles();
      }
    });

    this.subscription.add(routeSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  FetchArticles(){
    const fetchSubscription = this.fetcherService.fetchArticleByQuery(this.query || "").subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
      }
    });
    this.subscription.add(fetchSubscription);
  }
}
