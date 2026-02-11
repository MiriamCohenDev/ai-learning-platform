import { Injectable } from '@angular/core';

/**
 * AuthService handles client-side authentication state.
 * 
 * Responsibilities:
 * - Reading JWT from localStorage
 * - Extracting user role from JWT
 * - Providing helper methods for route guards and UI logic
 *
 * Notes:
 * - This service does not handle login/logout HTTP requests.
 * - JWT is expected to be stored in localStorage under 'access_token'.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

   /**
   * Returns the JWT access token from localStorage.
   * @returns JWT string if present, otherwise null
   */
  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Extracts the role of the currently logged-in user from the JWT.
   * @returns 'user', 'admin', or null if not logged in
   */
  get role(): 'user' | 'admin' | null {
    if (!this.token) return null;
    const payload = JSON.parse(atob(this.token.split('.')[1]));
    return payload.role;
  }

   /**
   * Checks if the current user is an admin.
   * @returns true if role is 'admin', false otherwise
   */
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  /** 
   * Checks if the current user is a regular user.
   * @returns true if role is 'user', false otherwise
   */
  isUser(): boolean {
    return this.role === 'user';
  }

  /**
   * Checks if any user is currently logged in.
   * @returns true if a valid JWT exists, false otherwise
   */
  isLoggedIn(): boolean {
    return !!this.token;
  }
}
