import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';

/**
 * Component for displaying all users in the admin panel.
 * 
 * Functionality:
 * - Fetches the full list of users from the backend via ApiService.
 * - Allows the admin to select a user and navigate to that user's history.
 * 
 * Note:
 * - When opening a user's history, this component navigates to the same 
 *   history component used by regular users, but includes a `userId` query parameter.
 * - The history component uses this `userId` to fetch and display the selected user's lessons.
 *   Access control is enforced there to ensure only admins can view other users' history.
 */
@Component({
  selector: 'app-admin-users',
  standalone: true,         
  imports: [CommonModule],   
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  api = inject(ApiService);
  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  selectedUserId: string | null = null;

  private navigation = inject(NavigationService);

  users: any[] = [];

  async ngOnInit() {
    this.users = await this.api.getAllUsers();
    this.cdr.detectChanges();
  }

    /**
   * Navigate to the history component for a specific user.
   * 
   * @param userId - The ID of the selected user.
   * 
   * Implementation detail:
   * - Sends the `userId` as a query parameter to the history component.
   * - The history component interprets this parameter to load the correct user's lessons.
   */
  openHistory(userId: string) {
    this.router.navigate(['/history'], { queryParams: { userId } });
  }

    /**
   * Navigate back to the previous page.
   */
    goBack() {
      this.navigation.goBack();
    }

}
