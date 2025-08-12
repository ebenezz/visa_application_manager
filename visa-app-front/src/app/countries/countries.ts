import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { NotificationService } from '../services/notification.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-country-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './countries.html',
  styleUrls: ['./countries.css']
})
export class CountriesComponent implements OnInit {
  countries: any[] = [];
  form: any = {};
  editing = false;
  displayedColumns = ['name', 'requirements', 'visaFee', 'processingTimeInDays', 'actions'];

  constructor(
    private countryService: CountryService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getAll().subscribe(data => {
      this.countries = data.filter(c => !c.isDeleted);

      // 🔔 Notify if there are pending applications
      const pending = data.filter(c => c.status === 'Pending');
      if (pending.length > 0) {
        this.notificationService.push(`${pending.length} applications awaiting review`, 'info');
      }

      // ⏰ Notify if deadlines are approaching
      const deadlineSoon = data.filter(c => {
        if (!c.deadline) return false;
        const daysLeft = (new Date(c.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
        return daysLeft <= 2;
      });

      if (deadlineSoon.length > 0) {
        this.notificationService.push(`${deadlineSoon.length} applications have deadlines within 2 days`, 'warning');
      }
    });
  }

  saveCountry(): void {
    if (this.editing && this.form.id) {
  const payload = { ...this.form };
  delete payload.isDeleted; // ✅ Prevent accidental soft-delete

  this.countryService.update(this.form.id, payload).subscribe(() => {
    this.loadCountries();
    this.resetForm();
  });
} else {
      this.countryService.create(this.form).subscribe(() => {
        this.loadCountries();
        this.resetForm();
      });
    }
  }

  editCountry(country: any): void {
    this.form = { ...country };
    this.editing = true;
  }

  softDelete(id: number): void {
    this.countryService.softDelete(id).subscribe(() => {
      this.loadCountries();
    });
  }

  resetForm(): void {
    this.form = {};
    this.editing = false;
  }
}