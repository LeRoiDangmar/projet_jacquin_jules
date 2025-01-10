import { Component } from '@angular/core';
import { FetcherService } from '../../../shared/services/fetcher.service';
import { Subscription } from 'rxjs';
import { ArticlePreview } from '../../../shared/models/articlePreview.model';

@Component({
  selector: 'app-featured',
  standalone: false,
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {

  constructor(private fetcherService: FetcherService){}
  private subscription: Subscription = new Subscription();

  featuredArticles: ArticlePreview[] = [];

  ngOnInit() {
    this.FeaturedArticles();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  FeaturedArticles(){
    const fetchSubscription = this.fetcherService.fetchFeaturedArticles().subscribe({
      next: (data) => {
        this.featuredArticles = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
    this.subscription.add(fetchSubscription);
  }

}
