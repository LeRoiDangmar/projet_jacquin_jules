import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Utilisateur } from '../../../shared/models/Utilisateur.model';


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

  getUsers(): Observable<Utilisateur[]> {
    const url = `${this.apiUrl}/getusers`
    return this.http.get<Utilisateur[]>(url)
  }

}


