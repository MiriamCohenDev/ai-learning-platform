import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import id from '@angular/common/locales/extra/id';
import { NavigationService } from '../../core/services/navigation.service';

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
  private navigation = inject(NavigationService);

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



  /**
* Opens the selected category.
* 
* Behavior:
* 1. Finds the category by ID from the current list.
* 2. If the category is "Other":
*    - Fetches its sub-categories from the API.
*    - Selects the single "Other" sub-category automatically.
*    - Navigates directly to the prompt page, skipping sub-category selection.
* 3. If the category is not "Other":
*    - Navigates to the sub-categories page for the selected category.
* 
* This ensures that "Other" categories bypass the sub-category selection
* and the prompt can be created immediately with the correct identifiers.
* 
* @param categoryId - The ID of the category selected by the user
*/
  async openCategory(categoryId: string) {
    const category = this.categories().find(cat => cat._id === categoryId);
    if (!category) return;

    const categoryName = category.name;

    if (categoryName === 'Other') {
      const otherSubCategories = await this.api.getSubCategories(categoryId);
      if (!otherSubCategories || otherSubCategories.length === 0) {
        console.error('No subcategory found for Other category');
        return;
      }

      const sub = { _id: otherSubCategories[0]._id, name: 'Other' };

      this.router.navigate(['/prompt', categoryId, sub._id]);
      return;
    }

    this.router.navigate(['/categories', categoryId, 'sub']);
  }

  /**
* Navigate back to the previous page.
*/
  goBack() {
    this.navigation.goBack();
  }


}
