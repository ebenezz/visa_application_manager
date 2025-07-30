import { Component, OnInit } from '@angular/core';
import { SummaryService, Summary } from '../services/summary';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  summary?: Summary;

  constructor(private summaryService: SummaryService) {}

  ngOnInit(): void {
    this.summaryService.getSummary().subscribe({
      next: (data) => this.summary = data,
      error: (err) => console.error('Failed to load summary:', err)
    });
  }
}

