import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  standalone: true,
  template: `
    <section class="panel">
      <h2>Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Harshit</td><td>Lab Lead</td><td>Research</td></tr>
          <tr><td>Aditi</td><td>QA Analyst</td><td>Quality</td></tr>
          <tr><td>Rahul</td><td>Technician</td><td>Testing</td></tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [
    `
      :host {
        color: var(--text, #191c24);
      }

      .panel {
        background: var(--surface, #fff);
        color: var(--text, #191c24);
        border: 1px solid var(--border, #e5e7ee);
        border-radius: 18px;
        padding: 24px;
        box-shadow: var(--shadow-md, 0 8px 24px rgba(16, 18, 27, 0.10));
      }

      h2 { margin: 0 0 20px; color: var(--text, #191c24); }

      table {
        width: 100%;
        border-collapse: collapse;
        color: var(--text, #191c24);
      }

      th, td {
        text-align: left;
        padding: 12px 10px;
        border-bottom: 1px solid var(--border, #e5e7ee);
        color: var(--text, #191c24);
      }

      th {
        color: var(--text-muted, #6b7180);
        font-weight: 600;
      }
    `,
  ],
})
export class EmployeeComponent {}
