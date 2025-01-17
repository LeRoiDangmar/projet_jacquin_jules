import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Utilisateur } from '../../../shared/models/Utilisateur.model';

@Component({
  selector: 'app-users-page',
  standalone: false,
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  user: Utilisateur | null = null;
  errorMessage: string | null = null;
  private subscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Subscribe to get the single user details.
    this.subscription = this.authService.getUser().subscribe({
      next: (data: Utilisateur) => {
        this.user = data;
        this.errorMessage = null;
        console.log('User loaded:', this.user);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', err);
        this.errorMessage = 'Vous n\'êtes pas connecté.';
      }
    });
  }

  /**
   * Called when the update form is submitted.
   * @param form - The template-driven form containing the user data.
   */
  onSubmit(form: any): void {
    if (form.valid && this.user != null) {
      this.authService.updateUser(this.user).subscribe({
        next: (updatedUser: Utilisateur) => {
          console.log('Utilisateur mis à jour:', updatedUser);
          // Update the local user data with the updated values.
          this.user = updatedUser;
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
          this.errorMessage = err.message || 'Erreur lors de la mise à jour de l\'utilisateur.';
        }
      });
    }
  }

  /**
   * Deletes the current user.
   */
  deleteUser(): void {
    if (this.user) {
      this.authService.deleteUser().subscribe({
        next: (res) => {
          console.log('Utilisateur supprimé avec succès:', res);
          // Optionally, clear the local user data or redirect the user.
          this.user = null;
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'utilisateur:', err);
          this.errorMessage = err.message || 'Erreur lors de la suppression de l\'utilisateur.';
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
