import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { TokenService } from '../services/token.service';
import { jwtDecode } from 'jwt-decode';

/**
 * Authentication Guard (authGuard)
 *
 * Protects Angular routes that require a logged-in user.
 * Checks if a JWT token exists and is still valid.
 * If the token is missing, expired, or invalid – redirects to /auth.
 *
 * Returns:
 *  - true: if the user is authenticated and the token is valid.
 *  - UrlTree to /auth: if the user is unauthenticated or the token is invalid.
 *
 * Notes:
 *  - Works with server-side rendering (Angular Universal) – blocks routes on the server.
 *  - Uses TokenService to get and delete the token as needed.
 */
export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const tokenService = inject(TokenService);

  if (!isPlatformBrowser(platformId)) {
    return router.parseUrl('/auth');
  }

  const token = tokenService.getToken();
  if (!token) {
    return router.parseUrl('/auth');
  }

  try {
    const decoded: any = jwtDecode(token);

    const now = Math.floor(Date.now() / 1000);
    if (!decoded.exp || decoded.exp < now) {
      tokenService.deleteToken();
      return router.parseUrl('/auth');
    }

    return true; 
  } catch (err) {
    console.error('Invalid token', err);
    tokenService.deleteToken();
    return router.parseUrl('/auth');
  }
};
