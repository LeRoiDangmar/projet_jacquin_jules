import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedComponent } from './featured/featured.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { SearchComponent } from './search/search.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  { path: '', component: FeaturedComponent },
  { path: 'categorie/:id', component: CategorieComponent},
  { path: 'search/:query', component: SearchComponent},
  { path: 'article/:id', component: ArticleComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ArticlePreviewComponent,
    CategorieComponent,
    SearchComponent,
    FeaturedComponent,
    ArticleComponent
  ],
  exports: [
    RouterModule,
    CommonModule,
  ]
})
export class FrontPageModule { }
