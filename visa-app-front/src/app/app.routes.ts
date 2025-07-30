
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component'
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { DashboardComponent } from './components/dashboard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  {
  path: 'login',
  component: LoginComponent
}
,

{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}

  // Add more routes here later
];
