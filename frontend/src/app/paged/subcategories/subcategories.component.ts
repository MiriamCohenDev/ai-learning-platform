import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'],
})
export class SubcategoriesComponent implements OnInit {
  subcategories = signal<Array<{ _id: string; name: string }>>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  categoryName = signal<string | null>(null);

  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('No category selected');
      return;
    }
    this.loading.set(true);
    try {
      const list = await this.api.getSubCategories(id);
      this.subcategories.set(list || []);
      // Store category ID for later use
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('selected_category_id', id);
      }
    } catch (err: any) {
      this.error.set(err?.message || 'Failed to load sub-categories');
    } finally {
      this.loading.set(false);
    }
  }

  choose(sub: { _id: string; name: string }) {
    // store selection and navigate to prompt
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('selected_subcategory', JSON.stringify(sub));
    }
    this.router.navigate(['/prompt']);
  }
}
