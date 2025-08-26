import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';


@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.html',
  styleUrls: ['./application-details.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule
  ]
})
export class ApplicationDetailsComponent implements OnInit {
  application: any;
  countries: { id: number; name: string }[] = [];
  loading = true;
  error = '';
  selectedFile: File | null = null;
  applicationId!: number;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applicationId = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin({
      application: this.applicationService.getApplication(this.applicationId),
      countries: this.http.get<{ id: number; name: string }[]>('http://localhost:5226/api/Country')
    }).subscribe({
      next: (res) => {
        this.application = res.application;
        this.countries = res.countries;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load application or countries.';
        this.loading = false;
      }
    });
  }

  goToApplication() {
  this.router.navigate(['/applications']);
}

updatePaymentStatus() {
  this.applicationService.updatePaymentStatus(this.application.id, this.application.isPaid).subscribe({
    next: () => {
      alert('Payment status updated');
    },
    error: () => {
      alert('Failed to update payment status:');
    }
  });
}

  getCountryName(id: number | null | undefined): string {
    if (id == null) return 'Unknown';
    const country = this.countries.find(c => c.id === id);
    return country ? country.name : 'Unknown';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadDocument(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.applicationService.uploadDocument(this.applicationId, formData).subscribe({
      next: () => {
        alert('Document uploaded successfully');
        this.refreshApplication();
      },
      error: () => alert('Failed to upload document')
    });
  }

  refreshApplication(): void {
    this.applicationService.getApplication(this.applicationId).subscribe({
      next: (data) => this.application = data,
      error: () => this.error = 'Failed to reload application.'
    });
  }

  updateStatus(): void {
    this.applicationService.updateStatus(this.applicationId, this.application.status).subscribe({
      next: () => alert('Status updated successfully'),
      error: () => alert('Failed to update status')
    });
  }

  softDelete(): void {
    this.applicationService.softDelete(this.applicationId).subscribe({
      next: () => alert('Application deleted'),
      error: () => alert('Failed to delete application')
    });
  }

  downloadPdf(): void {
    this.applicationService.downloadPdf(this.applicationId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `application_${this.applicationId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => alert('Failed to download PDF')
    });
  }

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  }
}