import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  users: any[] = [];

  async ngOnInit() {
    this.users = await this.api.getAllUsers();
    this.cdr.detectChanges();
  }

  openHistory(userId: string) {
    this.router.navigate(['/history'], { queryParams: { userId } });
  }
}
