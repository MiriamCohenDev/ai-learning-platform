import { Component, PLATFORM_ID, inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  public authService = inject(AuthService);
  private tokenService = inject(TokenService);
  
/**
   * Logs out the user by removing the JWT from cookies.
   * Only runs on the browser since cookies are not available on the server.
   */
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.tokenService.deleteToken();
    }
    this.router.navigate(['/auth']);
  }

    /**
   * On init, ensures that unauthenticated users are redirected to /auth.
   * This is a defensive check for server-side rendering or page reloads.
   */
  ngOnInit() {
    // Defensive check: if no token, redirect to auth
    if (isPlatformBrowser(this.platformId)) {
      const token = this.tokenService.getToken();
      if (!token) this.router.navigate(['/auth']);
    }
  }

  /** Navigate to the categories page. */
  navigateToCategories() {
    this.router.navigate(['/categories']);
  }

   /** Navigate to the user's lesson history page. */
  navigateToHistory() {
    this.router.navigate(['/history']);
  }

}
