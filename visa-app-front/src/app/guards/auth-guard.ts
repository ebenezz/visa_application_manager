import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const tokenValid = authService.isLoggedIn() && !authService.isTokenExpired();

  if (!tokenValid) {
    authService.logout();
    router.navigate(['/login']);
    return false;
  }

  return true;
};

@Injectable({ providedIn: 'root' })
export class SuperAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser(); // decode JWT or use session
    if (user?.role === 'SuperAdmin') {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
