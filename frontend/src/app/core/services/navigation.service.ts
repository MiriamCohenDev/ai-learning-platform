import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  /**
   * Navigate back one step depending on current route
   */
  goBack() {
    const url = this.router.url;

    if (url.startsWith('/categories/') && url.includes('/sub')) {
      // from subcategories -> categories
      this.router.navigate(['/categories']);
    } else if (url.startsWith('/prompt/')) {
  // URL: /prompt/:categoryId/:subId
  const segments = url.split('/');
  const categoryId = segments.length > 2 ? segments[2] : null;

  if (categoryId) {
    this.router.navigate(['/categories', categoryId, 'sub']);
  } else {
    // fallback
    this.router.navigate(['/categories']);
  }

    } else if (url.startsWith('/categories')) {
      // from categories -> home
      this.router.navigate(['/']);
    } else if (url.startsWith('/history/') && url !== '/history') {
      // from history detail -> history
      this.router.navigate(['/history']);
    } else if (url === '/history') {
      // from history -> home
      this.router.navigate(['/']);
    } else {
      // default fallback
      this.router.navigate(['/']);
    }
  }
}
