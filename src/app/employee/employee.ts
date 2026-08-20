import { Component, OnInit, signal } from '@angular/core';

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

  employees = signal<Employee[]>([]);

  loading = signal(false);

  errorMessage = signal('');

  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
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
