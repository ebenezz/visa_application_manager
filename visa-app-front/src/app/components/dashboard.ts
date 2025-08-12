import { Component, OnInit } from '@angular/core';
import { SummaryService, Summary } from '../services/summary';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatCard } from "@angular/material/card";
import {CommonModule} from '@angular/common';
import { PaymentStatusChartComponent } from '../components/payment-status-chart/payment-status-chart';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    RouterModule,
    MatCard,
    CommonModule,
    PaymentStatusChartComponent,
    MatProgressSpinnerModule,
],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  summary?: Summary;
  currentUrl: string = '';
application: any;
 

  constructor(
    private summaryService: SummaryService,
    private authService: AuthService,
    public router: Router,
  ) {
    // Reactively track route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
      console.log('Navigated to:', this.currentUrl); // debug
    });
  }

  ngOnInit(): void {
    this.summaryService.getSummary().subscribe({
      next: (data) => {
        console.log('Summary data:', data);
        this.summary = data;
      },
      error: (err) => console.error('Failed to load summary:', err)
    });
  }

  get isDashboard(): boolean {
    return this.router.url === '/dashboard';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
