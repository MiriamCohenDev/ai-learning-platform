// src/app/shared/navbar/navbar.component.ts
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  public authService = inject(AuthService);
  private tokenService = inject(TokenService);

    showNavbar(): boolean {
    const url = this.router.url;
    return !url.startsWith('/auth');
  }


  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.tokenService.deleteToken();
    }
    this.router.navigate(['/auth']);
  }
}
