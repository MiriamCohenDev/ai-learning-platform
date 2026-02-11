import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { TokenService } from '../core/services/token.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLogin = signal(true);
  isLoading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  // Login fields
  loginName = signal('');
  loginIdNumber = signal('');

  // Register fields
  registerName = signal('');
  registerIdNumber = signal('');
  registerPhone = signal('');

  private api = inject(ApiService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private tokenService = inject(TokenService);
  toggleMode() {
    this.isLogin.set(!this.isLogin());
    this.error.set(null);
    this.success.set(null);
  }

  async submitLogin() {
    this.error.set(null);
    this.success.set(null);

    if (!this.loginName() || !this.loginIdNumber()) {
      this.error.set('Please fill in all fields');
      return;
    }

    this.isLoading.set(true);
    try {
      const response = await this.api.login({
        name: this.loginName(),
        idNumber: this.loginIdNumber(),
      });

      if (isPlatformBrowser(this.platformId)) {
        this.tokenService.saveToken(response.access_token);
      }

      this.success.set('Login successful! Redirecting...');
      setTimeout(() => this.router.navigate(['/']), 1000);
    } catch (err: any) {
      this.error.set(err.message || 'Login failed. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async submitRegister() {
    this.error.set(null);
    this.success.set(null);

    if (!this.registerName() || !this.registerIdNumber()) {
      this.error.set('Name and ID Number are required');
      return;
    }

    // Validate Universal ID format (5-20 alphanumeric characters or hyphens/underscores)
    if (!/^[a-zA-Z0-9-_]{5,20}$/.test(this.registerIdNumber())) {
      this.error.set('ID Number');
      return;
    }

    this.isLoading.set(true);
    try {
      const response = await this.api.register({
        name: this.registerName(),
        idNumber: this.registerIdNumber(),
        phone: this.registerPhone() || undefined,
      });

      if (isPlatformBrowser(this.platformId)) {
        this.tokenService.saveToken(response.access_token);
      }

      this.success.set('Registration successful! Redirecting...');
      setTimeout(() => this.router.navigate(['/']), 1000);
    } catch (err: any) {
      this.error.set(err.message || 'Registration failed. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
