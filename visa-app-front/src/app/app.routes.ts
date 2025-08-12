
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component'
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { DashboardComponent } from './components/dashboard';
import { ApplicationComponent } from './pages/application';
import { ApplicationDetailsComponent } from './pages/application-details/application-details';
import { CountriesComponent } from './countries/countries';
import { NotificationComponent } from './notification/notification';

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
},

{
    path: '',
    component: DashboardComponent,  // contains sidebar
    children: [
      { path: 'dashboard', component: DashboardComponent }, // summary cards
      { path: 'applications', component: ApplicationComponent},
      { path: 'dashboard/applications/:id', component: ApplicationDetailsComponent},
      { path: 'countries', component: CountriesComponent },
      { path: 'notifications', component: NotificationComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
    ]
  },
 
  { path: '**', redirectTo: '' } // fallback
];


  // Add more routes here later

