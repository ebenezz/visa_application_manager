import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-payment-status-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule, MatCard],
  templateUrl: './payment-status-chart.html',
})
export class PaymentStatusChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public pieChartType: ChartType = 'pie';

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  public chartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadChartData();

    // 👇 Listen for navigation events to reload chart
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadChartData();
    });
  }

  private loadChartData() {
    this.applicationService.getPaymentStatusSummary().subscribe({
      next: (data) => {
        if (data && data.length) {
          this.pieChartData.labels = data.map(d => d.status);
          this.pieChartData.datasets[0].data = data.map(d => d.count);
        } else {
          this.pieChartData.labels = ['Paid', 'Unpaid'];
          this.pieChartData.datasets[0].data = [0, 0];
        }

        // 👇 Force chart redraw
        this.chart?.update();
      },
      error: (err) => {
        console.error('Failed to load chart data:', err);
        this.pieChartData.labels = ['Paid', 'Unpaid'];
        this.pieChartData.datasets[0].data = [0, 0];
        this.chart?.update();
      }
    });
  }
}