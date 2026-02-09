import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  private api = inject(ApiService);
  private router = inject(Router);

  users = signal<Array<{ id: string; name: string; idNumber: string; phone?: string }>>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.api.getAllUsers(); // פונקציה חדשה ב-ApiService
      this.users.set(data);
    } catch (err: any) {
      this.error.set(err.message || 'Failed to load users');
    } finally {
      this.loading.set(false);
    }
  }

  viewUser(userId: string) {
    this.router.navigate(['/admin/users', userId]);
  }

  navigateToLessons() {
    this.router.navigate(['/categories']);
  }

  navigateToHistory() {
    this.router.navigate(['/history']);
  }
}
