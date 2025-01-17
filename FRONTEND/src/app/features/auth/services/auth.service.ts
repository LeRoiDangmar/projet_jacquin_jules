import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Utilisateur } from '../../../shared/models/Utilisateur.model';
import { catchError } from 'rxjs/operators';


interface SignupResponse {
  message: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.backendLoginClient;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  signup(name: string, password: string, email: string, adresse: string ): Observable<SignupResponse> {
    const url = `${this.apiUrl}/signup`;

    const body = {
      login: name,
      password: password,
      email: email,
      adresse: adresse,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<SignupResponse>(url, body, { headers });
  }


login(username: string, password: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}/login`;

    const body = {
      login: username,
      password: password,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<LoginResponse>(url,body ,{ headers});
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  getUser(): Observable<Utilisateur> {
    const url = `${this.apiUrl}/getuser`
    return this.http.get<Utilisateur>(url)
  }

  deleteUser(): Observable<any> {
    const url = `${this.apiUrl}/delete`;
    const body = "";
    return this.http.post(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred during the delete operation:', error);

        let errorMessage = 'An error occurred while deleting the resource.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }


  updateUser(user: Utilisateur): Observable<any> {
    const url = `${this.apiUrl}/update`;
  
    const body: any = {
      login: user.nom,    
      email: user.email,
      adresse: user.adresse,
    };
  
    return this.http.post(url, body);
  }
  

}


