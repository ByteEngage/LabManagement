import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <section class="panel">
      <h2>Dashboard</h2>
      <div class="cards">
        <div class="card">
          <span>Total Labs</span>
          <strong>24</strong>
        </div>
        <div class="card">
          <span>Active Tests</span>
          <strong>148</strong>
        </div>
        <div class="card">
          <span>Pending QC</span>
          <strong>18</strong>
        </div>
      </div>
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

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 16px;
      }

      .card {
        background: linear-gradient(135deg, var(--accent-soft, rgba(62, 99, 221, 0.12)), var(--bg, #f5f6f8));
        color: var(--text, #191c24);
        border: 1px solid var(--border, #e5e7ee);
        border-radius: 14px;
        padding: 18px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .card span { color: var(--text-muted, #6b7180); }
      .card strong { font-size: 2rem; color: var(--text, #191c24); }
    `,
  ],
})
export class DashboardComponent {}
