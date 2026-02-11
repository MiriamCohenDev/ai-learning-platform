import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Guard to protect routes accessible only by admin users.
 * 
 * Uses AuthService to check if the current user has admin privileges.
 * Returns true if the user is admin, false otherwise, preventing access.
 */
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isAdmin();
};
