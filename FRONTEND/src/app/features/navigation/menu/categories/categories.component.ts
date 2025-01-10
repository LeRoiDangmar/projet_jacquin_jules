import { Component } from '@angular/core';
import { Categorie } from '../../../../shared/models/categorie.model';
import { FetcherService } from '../../../../shared/services/fetcher.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  link: string = "categorie";

  constructor(private fetcherService: FetcherService){}
  private subscription: Subscription = new Subscription();

  categories: Categorie[] = [];

  ngOnInit() {
    this.fetchCategories();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchCategories(){
    const fetchSubscription = this.fetcherService.fetchCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
    this.subscription.add(fetchSubscription);
  }
}
