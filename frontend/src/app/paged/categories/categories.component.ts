import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories = signal<Array<{ _id: string; name: string }>>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  private api = inject(ApiService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  async ngOnInit() {
    this.loading.set(true);
    try {
      const list = await this.api.getCategories();
      this.categories.set(list || []);
    } catch (err: any) {
      this.error.set(err?.message || 'Failed to load categories');
    } finally {
      this.loading.set(false);
    }
  }

   /**
   * Navigate to the sub-categories page for the selected category.
   * @param categoryId - the ID of the category to open
   */
  openCategory(categoryId: string) {
    this.router.navigate(['/categories', categoryId, 'sub']);
  }
}
