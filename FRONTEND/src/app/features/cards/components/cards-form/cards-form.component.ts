import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CardsService } from '../../services/cards.service';

@Component({
    selector: 'app-cards-form',
    templateUrl: './cards-form.component.html',
    styleUrls: ['./cards-form.component.css'],
    standalone: false
})
export class CardsFormComponent implements OnInit {
  carteForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private cardsService: CardsService) {
    this.carteForm = this.fb.group({
      nomCarte: ['', [Validators.required, Validators.minLength(3)]],
      codeCarte: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      ccv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      mois: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      annee: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }

  ngOnInit(): void {}

  get nomCarte(): AbstractControl {
    return this.carteForm.get('nomCarte')!;
  }

  get codeCarte(): AbstractControl {
    return this.carteForm.get('codeCarte')!;
  }

  get ccv(): AbstractControl {
    return this.carteForm.get('ccv')!;
  }

  get mois(): AbstractControl {
    return this.carteForm.get('mois')!;
  }

  get annee(): AbstractControl {
    return this.carteForm.get('annee')!;
  }

  onSubmit() {
    this.submitted = true;

    if (this.carteForm.invalid) {
      return;
    }

    this.cardsService.addCard(this.carteForm.value).subscribe(response => {
      console.log('Carte ajoutée avec succès', response);
      this.onReset();
    }, error => {
      console.error('Erreur lors de l\'ajout de la carte', error);
    });
  }

  onReset() {
    this.submitted = false;
    this.carteForm.reset();
  }
}
