import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';

interface SelectedSubcategory {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
})
export class PromptComponent {
  private api = inject(ApiService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  promptText = signal<string>('');
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  selectedSubcategory = signal<SelectedSubcategory | null>(null);
  categoryId = signal<string | null>(null);
  showResult = signal(false);

  constructor() {
    this.loadSelection();
  }

  loadSelection() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('selected_subcategory');
      const catId = localStorage.getItem('selected_category_id');
      if (stored) {
        this.selectedSubcategory.set(JSON.parse(stored));
      }
      if (catId) {
        this.categoryId.set(catId);
      }
    }
  }

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
        subCategoryId: subcategory._id,
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

  goBack() {
    this.router.navigate(['/categories']);
  }

  closeResult() {
    this.showResult.set(false);
    this.success.set(null);
  }
}
