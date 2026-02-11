import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';


/**
 * Component for submitting user prompts and displaying AI-generated lessons.
 * Handles category/subcategory selection, input validation, API requests, and displaying results.
 */
@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
})
export class PromptComponent implements OnInit{
  private api = inject(ApiService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private navigation = inject(NavigationService);


  promptText = signal<string>('');
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  showResult = signal(false);
  categoryId = signal<string | null>(null);
  selectedSubcategory = signal<string | null>(null);
  categoryName = signal<string | null>(null);
  subcategoryName = signal<string | null>(null)


ngOnInit() {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    const subId = this.route.snapshot.paramMap.get('subId');

    if (!categoryId || !subId) {
      this.error.set('No category selected.');
      return;
    }

    this.categoryId.set(categoryId);
    this.selectedSubcategory.set(subId);

    this.api.getCategories()
    .then(categories => {
      const category = categories.find(c => c._id === categoryId);
      if (category) {
        this.categoryName.set(category.name);
      }
    })
    .catch(err => console.error('Failed to load category', err));

    this.api.getSubCategories(categoryId)
    .then(subcategories => {
      const sub = subcategories.find(s => s._id === subId);
      if (sub) {
        this.subcategoryName.set(sub.name);
        this.selectedSubcategory.set(sub._id); 
      }
    })
    .catch(err => console.error('Failed to load subcategory', err));
}
  

   /**
   * Submit a prompt to the backend API.
   * Performs input validation, shows loading state, and handles API response or errors.
   * On success, displays the AI-generated lesson and clears the prompt input.
   */
  async submitPrompt() {
    const subcategory = this.selectedSubcategory();
    const catId = this.categoryId();
    const promptTextValue = this.promptText().trim();

    if (!promptTextValue) {
      this.error.set('Please enter a prompt');
      return;
    }

    if (!subcategory || !catId) {
      this.error.set('No category selected. Please go back and select a category.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);

    try {
      const result = await this.api.submitPrompt({
        categoryId: catId,
        subCategoryId: subcategory,
        prompt: promptTextValue,
      });

      this.success.set(result.lesson);
      this.showResult.set(true);
      this.promptText.set('');
    } catch (err: any) {
      this.error.set(err?.message || 'Failed to generate lesson');
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
   * Close the lesson result modal and clear the displayed lesson.
   */
  closeResult() {
    this.showResult.set(false);
    this.success.set(null);
  }
}
