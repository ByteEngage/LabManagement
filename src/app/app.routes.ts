import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { EmployeeComponent } from './employee/employee';
import { AppShellComponent } from './layout/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employees', component: EmployeeComponent },
      { path: 'projects', component: DashboardComponent },
      { path: 'team', component: EmployeeComponent },
      { path: 'messages', component: DashboardComponent },
      { path: 'reports', component: DashboardComponent },
      { path: 'settings', component: EmployeeComponent },
    ],
  },
];