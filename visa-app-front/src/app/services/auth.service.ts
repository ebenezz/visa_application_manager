import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private idleTimeout: any;
  private baseUrl = 'http://localhost:5226/api'; 
  private isBrowserEnv: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowserEnv = isPlatformBrowser(this.platformId);
  }

  private isBrowser(): boolean {
    return this.isBrowserEnv;
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!this.getToken();
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    }
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap(response => {
        console.log('AuthService login response:', response);
        if (this.isBrowser()) {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          if (response.admin) {
            localStorage.setItem('admin', JSON.stringify(response.admin));
          }
        }
      })
    );
  }

  getTokenExpiration(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000;
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      if (!exp) return true;

      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (e) {
      console.error('Error decoding token', e);
      return true;
    }
  }

private redirected = false;

checkTokenAndLogoutIfExpired() {
  const token = this.getToken();

  if (token && this.isTokenExpired() && !this.redirected) {
    this.redirected = true;
    this.logout();
    if (this.isBrowser()) {
      alert('Session expired. Please log in again.');
      window.location.href = '/login';
    }
  }
}



  startIdleMonitor(timeoutMs = 15 * 60 * 1000) {
    this.clearIdleMonitor();

    if (!this.isBrowser()) return;

    const reset = () => {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = setTimeout(() => {
        this.logout();
        alert('Logged out due to inactivity');
        window.location.href = '/login';
      }, timeoutMs);
    };

    ['click', 'mousemove', 'keydown'].forEach(event =>
      window.addEventListener(event, reset)
    );

    reset(); // start timer
  }

  clearIdleMonitor() {
    clearTimeout(this.idleTimeout);
  }
}
