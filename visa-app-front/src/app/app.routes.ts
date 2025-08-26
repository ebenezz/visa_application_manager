import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login/login';
import { authGuard, SuperAdminGuard } from './guards/auth-guard';
import { DashboardComponent } from './components/dashboard';
import { ApplicationComponent } from './pages/application';
import { ApplicationDetailsComponent } from './pages/application-details/application-details';
import { CountriesComponent } from './countries/countries';
import { NotificationComponent } from './notification/notification';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: '',
    component: DashboardComponent, // contains sidebar
    children: [
      { path: 'dashboard', component: DashboardComponent }, // summary cards
      { path: 'applications', component: ApplicationComponent },
      { path: 'dashboard/applications/:id', component: ApplicationDetailsComponent },
      { path: 'countries', component: CountriesComponent },
      { path: 'notifications', component: NotificationComponent },
       {
      path: 'create-admin',
      loadComponent: () =>
        import('./admin/create-admin/create-admin').then(m => m.CreateAdminComponent ), canActivate: [() => inject(SuperAdminGuard).canActivate()]

    },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '' } // fallback
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64] // optional: offset for fixed navbar
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}