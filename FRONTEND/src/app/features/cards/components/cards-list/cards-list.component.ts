import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Card } from '../../../../shared/models/card.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.css'],
    standalone: false
})
export class CardsListComponent implements OnInit {
  cards$: Observable<Card[]>;
  searchTerm: string = '';

  constructor(private cardsService: CardsService) {
    this.cards$ = this.cardsService.getCards();
  }

  ngOnInit(): void {}

  deleteCard(index: number): void {
    this.cardsService.deleteCard(index).subscribe(success => {
      if (success) {
        console.log('Carte supprimée avec succès');
      } else {
        console.error('Erreur lors de la suppression de la carte');
      }
    });
  }
}
