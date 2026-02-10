import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  get role(): 'user' | 'admin' | null {
    if (!this.token) return null;
    const payload = JSON.parse(atob(this.token.split('.')[1]));
    return payload.role;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isUser(): boolean {
    return this.role === 'user';
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
