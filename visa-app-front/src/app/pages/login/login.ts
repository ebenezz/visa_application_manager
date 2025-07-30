import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 
login() {
  console.log('Login() method triggered');
  console.log('Form values:', this.loginForm.value);

  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log('Full response:', response);
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
          console.log('Token stored:', localStorage.getItem('token'));
          this.router.navigate(['/dashboard']);
        } else {
          console.error('No token in response:', response);
          this.errorMessage = 'Login succeeded but no token was returned.';
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid username or password';
      },
    });
  } else {
    console.warn('Form is invalid');
  }
}





}
