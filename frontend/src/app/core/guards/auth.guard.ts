import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivateFn } from '@angular/router';

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
