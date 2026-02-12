import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { NavigationService } from '../../core/services/navigation.service';

/**
 * Component for displaying sub-categories of a selected category.
 * 
 * Responsibilities:
 * - Fetch the list of sub-categories for a given category ID from the backend.
 * - Handle loading state and errors during the API call.
 * - Navigate to the PromptComponent after a sub-category is selected.
 * 
 * Notes:
 * - The component retrieves the category ID from the route parameters.
 *   preventing issues during server-side rendering (Angular Universal).
 */
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
  private navigation = inject(NavigationService);

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
    } catch (err: any) {
      this.error.set(err?.message || 'Failed to load sub-categories');
    } finally {
      this.loading.set(false);
    }
  }


  /**
  * Navigate back to the previous page.
  */
  goBack() {
    this.navigation.goBack();
  }


  /**
 * Handle sub-category selection
 * 
 * and navigates to the prompt submission page.
 * 
 * @param sub The selected sub-category object
 */
  choose(sub: { _id: string; name: string }) {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (!categoryId) return;

    this.router.navigate(['/prompt', categoryId, sub._id]);


  }
}
