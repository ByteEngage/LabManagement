import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { EmployeeComponent } from './employee/employee';
import { AppShellComponent } from './layout/app-layout.component';
import { ReportsComponent} from './reports/reports';
import {Departments} from './departments/departments';
import {EmployeeForm} from './employee/employee-form/employee-form';
export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'employees', loadComponent: () => import('./employee/employee').then(m => m.EmployeeComponent) },
      { path: 'employee', redirectTo: 'employees', pathMatch: 'full' },
      {path: 'add-employee', loadComponent: () => import('./employee/employee-form/employee-form').then(m => m.EmployeeForm)},
      { path: 'departments', loadComponent: () => import('./departments/departments').then(m => m.Departments) },
      { path: 'team', loadComponent: () => import('./employee/employee').then(m => m.EmployeeComponent) },
      { path: 'messages', loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'report', loadComponent: () => import('./reports/reports').then(m => m.ReportsComponent) },
      { path: 'settings', loadComponent: () => import('./employee/employee').then(m => m.EmployeeComponent) },
    ],
  },
];