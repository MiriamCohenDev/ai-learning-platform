import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivateFn } from '@angular/router';

/**
 * Guard to protect routes that require authentication.
 * 
 * Checks if the code is running in the browser (not server-side) and
 * whether an access token exists in localStorage.  
 * - If the token exists, allows access.
 * - If not, redirects the user to the login page.
 * 
 * Purpose:
 *  - Prevents unauthenticated users from accessing protected routes.
 *  - Ensures proper behavior in server-side rendering (Angular Universal),
 *    by blocking route activation on the server.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  // If running on the server, redirect to auth (do not render protected routes)
  if (!isPlatformBrowser(platformId)) {
    try {
      router.navigate(['/auth']);
    } catch {}
    return false;
  }

  const token = localStorage.getItem('access_token');
  if (token) return true;

  router.navigate(['/auth']);
  return false;
};
