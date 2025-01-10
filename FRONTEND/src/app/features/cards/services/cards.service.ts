import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Card } from '../../../shared/models/card.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private storageKey = 'cards';
  private cardsSubject: BehaviorSubject<Card[]>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    let initialCards: Card[] = [];

    if (isPlatformBrowser(this.platformId)) {
      const savedCards = localStorage.getItem(this.storageKey);
      initialCards = savedCards ? JSON.parse(savedCards) : [];
    }

    this.cardsSubject = new BehaviorSubject<Card[]>(initialCards);
  }

  getCards(): Observable<Card[]> {
    return this.cardsSubject.asObservable();
  }

  addCard(card: Card): Observable<Card> {
    const currentCards = this.cardsSubject.value;
    const updatedCards = [...currentCards, card];
    this.cardsSubject.next(updatedCards);
    this.updateLocalStorage(updatedCards);
    return of(card);
  }

  updateCard(index: number, updatedCard: Card): Observable<Card> {
    const currentCards = this.cardsSubject.value;
    currentCards[index] = updatedCard;
    this.cardsSubject.next([...currentCards]);
    this.updateLocalStorage(currentCards);
    return of(updatedCard);
  }

  deleteCard(index: number): Observable<boolean> {
    const currentCards = this.cardsSubject.value;
    currentCards.splice(index, 1);
    this.cardsSubject.next([...currentCards]);
    this.updateLocalStorage(currentCards);
    return of(true);
  }

  private updateLocalStorage(cards: Card[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(cards));
    }
  }
}

