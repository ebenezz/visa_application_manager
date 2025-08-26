import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
   standalone: true,
  selector: 'app-create-admin',
  templateUrl: './create-admin.html',
  styleUrls: ['./create-admin.css'],
  imports: [MatInputModule, MatSelectModule, ReactiveFormsModule, CommonModule
  ]
})
export class CreateAdminComponent implements OnInit {
  adminForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Admin', Validators.required] // default role
    });
  }

  onSubmit(): void {
    if (this.adminForm.invalid) return;

    this.loading = true;
    this.adminService.createAdmin(this.adminForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Admin created successfully ✅', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.loading = false;
        console.error('Admin creation failed:', err);
        this.snackBar.open('Failed to create admin ❌', 'Close', { duration: 3000 });
      }
    });
  }
}