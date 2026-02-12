import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NavigationService } from '../../core/services/navigation.service';

/**
 * Component for displaying a single lesson (history detail).
 * 
 * Behavior:
 * - Regular users can view only their own lesson by lesson ID.
 * - Admin users can view any user's lesson by providing a `userId` query parameter.
 *   If a non-admin attempts to access another user's lesson, access is blocked.
 * 
 * The component fetches the lesson details from the backend using ApiService
 * and manages loading state and change detection.
 */
@Component({
  standalone: true,
  selector: 'app-history-detail',
  imports: [CommonModule],
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
})
export class HistoryDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  public authService = inject(AuthService);
  private navigation = inject(NavigationService);

  lesson: any;
  isLoaded = false;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const userId = this.route.snapshot.queryParamMap.get('userId');
    console.log('Lesson ID from route:', id);

    if (!id) return;

    try {

      if (userId) {
        // Admin viewing another user's lesson
        if (!this.authService.isAdmin()) {
          console.error('Not authorized to view other users lesson');
          return;
        }

        this.lesson = await this.api.getUserPrompt(userId, id);
      } else {
        // Regular user: view own lesson
        this.lesson = await this.api.getLessonById(id);
      }

      this.isLoaded = true;
      this.cdr.detectChanges();
      console.log('isLoaded set to true');
    } catch (err) {
      console.error('Error loading lesson:', err);
    }
  }

  /**
  * Navigate back to the previous page.
  */
  goBack() {
    this.navigation.goBack();
  }

}
