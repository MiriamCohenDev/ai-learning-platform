import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

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

  lesson: any;
  isLoaded = false;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const userId = this.route.snapshot.queryParamMap.get('userId');
    console.log('Lesson ID from route:', id);

    if (!id) return;

    try {

      if (userId) {
        if (!this.authService.isAdmin()) {
          console.error('Not authorized to view other users lesson');
          return;
        }

        this.lesson = await this.api.getUserPrompt(userId, id);
      } else {
        this.lesson = await this.api.getLessonById(id);
      }

      this.isLoaded = true;
      this.cdr.detectChanges();
      console.log('isLoaded set to true');
    } catch (err) {
      console.error('Error loading lesson:', err);
    }
  }


  back() {
    this.router.navigate(['/history']);
  }
}
