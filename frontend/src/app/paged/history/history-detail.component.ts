import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { ChangeDetectorRef } from '@angular/core';

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

  lesson: any;
  isLoaded = false;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Lesson ID from route:', id);

    if (!id) return;

    try {
      this.lesson = await this.api.getLessonById(id); 
      console.log('Lesson received from API:', this.lesson);

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
