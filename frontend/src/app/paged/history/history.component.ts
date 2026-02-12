import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NavigationService } from '../../core/services/navigation.service';

/**
 * Component for displaying lesson history.
 * 
 * Behavior:
 * - Regular users see only their own lesson history.
 * - Admin users can view the history of other users by passing a `userId` via query parameters.
 *   If a non-admin tries to view another user's history, access is blocked.
 * 
 * This component fetches the lessons from the backend using ApiService, 
 * and handles navigation to individual lessons.
 */

@Component({
  standalone: true,
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  public authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private navigation = inject(NavigationService);

  lessons: any[] = [];
  private viewingUserId?: string;

  async ngOnInit() {
    // Check if a userId is provided in query params (admin viewing another user)
    const userIdFromQuery = this.route.snapshot.queryParamMap.get('userId');

    if (userIdFromQuery) {
      // Only allow admins to view another user's history
      if (!this.authService.isAdmin()) {
        console.error('Not authorized to view other users history');
        return;
      }
      this.viewingUserId = userIdFromQuery;
      this.lessons = await this.api.getUserHistory(userIdFromQuery);
    } else {
      // Regular user: fetch own history
      this.lessons = await this.api.getHistory();
    }

    this.cdr.detectChanges();

  }

  /**
  * Navigate to a specific lesson.
  * - If admin viewing another user, preserves the userId query parameter.
  * - Otherwise, navigates normally to the lesson detail.
  * @param id The ID of the lesson to open
  */
  openLesson(id: string) {
    if (this.viewingUserId) {
      this.router.navigate(['/history', id], {
        queryParams: { userId: this.viewingUserId }
      });
    } else {
      this.router.navigate(['/history', id]);
    }
  }
  /**
* Navigate back to the previous page.
*/
  goBack() {
    this.navigation.goBack();
  }


}
