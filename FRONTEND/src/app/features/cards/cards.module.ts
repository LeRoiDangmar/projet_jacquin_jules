import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsFormComponent } from './components/cards-form/cards-form.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Importer FormsModule
import { FilterCardsPipe } from './pipes/filter-cards.pipe';
import { FormatCardCodePipe } from './pipes/format-card-code.pipe';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { CardsComponent } from './components/cards/cards.component';

const routes: Routes = [
  { path: '', component: CardsComponent }
];

@NgModule({
  declarations: [
    CardsFormComponent,
    CardsListComponent,
    FilterCardsPipe,
    FormatCardCodePipe,
    CardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CardsFormComponent,
    CardsListComponent,
    FilterCardsPipe,
    FormatCardCodePipe,
  ]
})
export class CardsModule { }
