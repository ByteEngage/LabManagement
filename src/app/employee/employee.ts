import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {
  Employee,
  EmployeeService
} from '../core/services/employee-service';

@Component({
  selector: 'app-employee',
  standalone: true,
  templateUrl: './employee.html',
  styleUrls: ['./employee.scss']
})
export class EmployeeComponent implements OnInit {

  private platformId = inject(PLATFORM_ID);

  employees = signal<Employee[]>([]);

  loading = signal(false);

  errorMessage = signal('');

  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadEmployees();
    }
  }

  loadEmployees(): void {

    this.loading.set(true);

    this.errorMessage.set('');

    console.log('Loading employees...');

    this.employeeService.getEmployee().subscribe({

      next: (data) => {

        console.log('Employees received:', data);

        this.employees.set(data);

        this.loading.set(false);

      },

      error: (error) => {

        console.error('Employee API Error:', error);

        this.errorMessage.set(
          'Unable to load employees. Please try again.'
        );

        this.loading.set(false);

      }

    });

  }

}
