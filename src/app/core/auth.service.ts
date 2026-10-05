import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, map, shareReplay, tap, throwError } from 'rxjs';
import { API_BASE_URL } from '../environment';

export interface AppUser {
  email: string;
  role: string;
}

interface JwtResponse {
  token: string;
  type: string;
  refreshToken: string;
  id: number;
  email: string;
  role: string;
}

interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

const TOKEN_KEY = 'ims-token';
const REFRESH_TOKEN_KEY = 'ims-refresh-token';
const USER_KEY = 'ims-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly _currentUser = signal<AppUser | null>(this.readStoredUser());
  readonly currentUser = this._currentUser.asReadonly();

  private refreshInFlight: Observable<string> | null = null;

  login(email: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${API_BASE_URL}/api/auth/login`, { email, password }).pipe(
      tap((response) => {
        const user: AppUser = { email: response.email, role: response.role };
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this._currentUser.set(user);
      }),
    );
  }

  refreshAccessToken(): Observable<string> {
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!storedRefreshToken) {
      return throwError(() => new Error('No refresh token available.'));
    }

    if (!this.refreshInFlight) {
      this.refreshInFlight = this.http
        .post<TokenRefreshResponse>(`${API_BASE_URL}/api/auth/refresh`, {
          refreshToken: storedRefreshToken,
        })
        .pipe(
          tap((response) => {
            localStorage.setItem(TOKEN_KEY, response.accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
          }),
          map((response) => response.accessToken),
          finalize(() => {
            this.refreshInFlight = null;
          }),
          shareReplay(1),
        );
    }

    return this.refreshInFlight;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private readStoredUser(): AppUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AppUser;
    } catch {
      return null;
    }
  }
}