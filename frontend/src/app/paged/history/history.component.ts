import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

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

  lessons: any[] = [];
  private viewingUserId?: string;

  async ngOnInit() {
    const userIdFromQuery = this.route.snapshot.queryParamMap.get('userId');

    if (userIdFromQuery) {
      
      if (!this.authService.isAdmin()) {
        console.error('Not authorized to view other users history');
        return;
      }
      this.viewingUserId = userIdFromQuery;
      this.lessons = await this.api.getUserHistory(userIdFromQuery);
    } else {
      this.lessons = await this.api.getHistory();
    }
    
    this.cdr.detectChanges();
    
  }

  openLesson(id: string) {
    if (this.viewingUserId) {
      this.router.navigate(['/history', id], {
        queryParams: { userId: this.viewingUserId }
      });
    } else {
      this.router.navigate(['/history', id]);
    }
  }

}
