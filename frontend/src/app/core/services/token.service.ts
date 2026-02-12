import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenName = 'access_token';

  constructor(private cookieService: CookieService) { }

  saveToken(token: string) {
    this.cookieService.set(this.tokenName, token, 7, '/');
  }

  getToken(): string {
    return this.cookieService.get(this.tokenName);
  }

  deleteToken() {
    this.cookieService.delete(this.tokenName, '/');
  }
}
