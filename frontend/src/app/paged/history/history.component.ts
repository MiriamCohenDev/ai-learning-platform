import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { ChangeDetectorRef } from '@angular/core';

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

  lessons: any[] = [];

  async ngOnInit() {
    const res = await this.api.getHistory();
    this.lessons = res;
    this.cdr.detectChanges();
    
  }



  openLesson(id: string) {
    this.router.navigate(['/history', id]);
  }
}
