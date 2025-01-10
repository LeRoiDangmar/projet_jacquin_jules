import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../../../shared/models/card.model';

@Pipe({
    name: 'filterCards',
    standalone: false
})
export class FilterCardsPipe implements PipeTransform {

  transform(cards: Card[] | null, searchTerm: string): Card[] {
    if (!cards || !searchTerm) {
      return cards || [];
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    return cards.filter(card =>
      card.nomCarte.toLowerCase().includes(lowerSearchTerm) ||
      card.codeCarte.includes(searchTerm)
    );
  }

}
