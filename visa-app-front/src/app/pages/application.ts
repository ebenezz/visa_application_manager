import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NotificationService } from '../services/notification.service';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';

// Forms
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, // ✅ Enables ngModel and ngForm
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule, // ✅ Enables mat-checkbox
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatIconModule
  ],
  templateUrl: './application.html',
  styleUrls: ['./application.css']
})

export class ApplicationComponent implements OnInit {
  applications: any[] = [];
  countries: { id: number; name: string }[] = [];
  loading = true;

  constructor(private http: HttpClient, private router: Router,  private notificationService: NotificationService) {}


  form = {
  applicantName: '',
  passportNumber: '',
  email: '',
  phoneNumber: '',
  countryId: null,
  status: 'Pending',
  isPaid: false,
  isDeleted: false

};

addApplication() {
  const newApp = {
    ...this.form,
    createdAt: new Date()
  };

  this.http.post<any>('http://localhost:5226/api/Application', newApp).subscribe({
    next: (savedApp) => {
      this.applications.unshift(savedApp); // ✅ Add to top of table
      this.resetForm();                    // ✅ Reset after update
    },
    error: (err) => {
      console.error('Failed to add application', err);
    }
  });
}

resetForm(formRef?: NgForm) {
  this.form = {
    applicantName: '',
    passportNumber: '',
    email: '',
    phoneNumber: '',
    countryId: null,
    status: 'Pending',
    isPaid: false,
    isDeleted: false
  };

  if (formRef) {
    formRef.resetForm(); // ✅ Resets validation state
  }
}


  ngOnInit(): void {
    forkJoin({
      applications: this.http.get<any[]>('http://localhost:5226/api/Application'),
      countries: this.http.get<{ id: number; name: string }[]>('http://localhost:5226/api/Country')
    }).subscribe({
      next: (res) => {
        this.applications = res.applications;
        this.countries = res.countries;
        this.loading = false;
              // ✅ Push individual notifications for each pending application
      this.notificationService.pushPendingApplications(this.applications);

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