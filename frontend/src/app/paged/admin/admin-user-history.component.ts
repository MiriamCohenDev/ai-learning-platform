import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-admin-user-history',
  standalone: true,
  imports: [
    CommonModule, 
    DatePipe,  
    SlicePipe 
  ],
  templateUrl: '../history/history.component.html',
})
export class AdminUserHistoryComponent implements OnInit {
  api = inject(ApiService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  lessons: any[] = [];

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id')!;
    this.lessons = await this.api.getUserHistory(userId);
  }

  openLesson(lessonId: string) {
    this.router.navigate(['/lesson', lessonId]);
  }
}
