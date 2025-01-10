import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


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

  private apiUrl = 'https://cnamapp-2cms.onrender.com/api/auth'; // Update with your API base URL
  private tokenKey = 'auth_token';

  // Observable to track authentication status
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) { }

  /**
   * Check if a token exists in localStorage
   */
  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false;
  }

  /**
   * Observable to get authentication status
   */
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  /**
   * Sign up a new user
   * @param username 
   * @param password 
   */
  signup(username: string, password: string): Observable<SignupResponse> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post<SignupResponse>(url, { username, password });
  }

  /**
   * Log in a user
   * @param username 
   * @param password 
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<LoginResponse>(url, { username, password })
      .pipe(
        tap(response => {
          if (response.token) {
            this.setToken(response.token);
            this.loggedIn.next(true);
          }
        })
      );
  }

  /**
   * Log out the user
   */
  logout(): void {
    this.removeToken();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Store the JWT token in localStorage
   * @param token 
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Remove the token from localStorage
   */
  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Get the stored token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    // Optionally, add token expiration check here
    return this.hasToken();
  }

  /**
   * Example method to access a protected route
   */
  accessProtectedRoute(): Observable<any> {
    const url = `${this.apiUrl}/protected`;
    return this.http.get<any>(url);
  }
}
