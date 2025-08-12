import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule, RouterModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './application.html',
  styleUrls: ['./application.css']
})
export class ApplicationComponent implements OnInit {
  applications: any[] = [];
  countries: { id: number; name: string }[] = [];
  loading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    forkJoin({
      applications: this.http.get<any[]>('http://localhost:5226/api/Application'),
      countries: this.http.get<{ id: number; name: string }[]>('http://localhost:5226/api/Country')
    }).subscribe({
      next: (res) => {
        this.applications = res.applications;
        this.countries = res.countries;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load data', err);
        this.loading = false;
      }
    });
  }

  getCountryName(id: number): string {
    const country = this.countries.find(c => c.id == id);
    return country ? country.name : 'Unknown';
  }

  viewDetails(id: number) {
    this.router.navigate(['/dashboard/applications', id]);
  }

  displayedColumns: string[] = [
  'applicantName',
  'passportNumber',
  'country',
  'status',
  'isPaid',
  'createdAt',
  'actions'
];
}