import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router, private route: ActivatedRoute) { }

  /**
   * Navigate back one step depending on current route
   */
  goBack() {
    const url = this.router.url;
    const queryParams = this.route.snapshot.queryParams;
    const userId = queryParams['userId'];

    // ADMIN viewing another user's history
    if (url.startsWith('/history/') && userId) {
      // from lesson details -> user's history
      const segments = url.split('/');
      const lessonId = segments.length > 2 ? segments[2] : null;
      if (lessonId) {
        this.router.navigate(['/history'], { queryParams: { userId } });
        return;
      }
    }

    if (url.startsWith('/history') && userId) {
      // from user's history -> admin users page
      this.router.navigate(['/admin/users']);
      return;
    }

    // Normal user or admin without userId query
    if (url.startsWith('/categories/') && url.includes('/sub')) {
      this.router.navigate(['/categories']);
    } else if (url.startsWith('/prompt/')) {
      // URL: /prompt/:categoryId/:subId
      const segments = url.split('/');
      const categoryId = segments.length > 2 ? segments[2] : null;

      if (categoryId) {
        this.router.navigate(['/categories', categoryId, 'sub']);
      } else {
        this.router.navigate(['/categories']);
      }

    } else if (url.startsWith('/categories')) {
      this.router.navigate(['/']);
    } else if (url.startsWith('/history/') && !userId) {
      // from history detail -> history
      this.router.navigate(['/history']);
    } else if (url === '/history' && !userId) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
