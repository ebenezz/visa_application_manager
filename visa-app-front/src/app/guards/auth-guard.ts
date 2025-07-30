import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
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
