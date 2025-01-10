import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Utilisateur } from '../../../shared/models/Utilisateur.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-page',
standalone: false,
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent implements OnInit, OnDestroy {
  users: Utilisateur[] = [];
  errorMessage: string | null = null;
  private usersSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.usersSubscription = this.authService.getUsers().subscribe({
      next: (data: Utilisateur[]) => {
        this.users = data;
        this.errorMessage = null;
        console.log(this.users);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
        this.errorMessage = 'Vous n\'êtes pas connecté.';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}

