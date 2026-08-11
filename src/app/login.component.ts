import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="login-shell">
      <div class="login-card">
        <div class="brand-block">
          <div class="brand-badge">LM</div>
          <p class="eyebrow">Lab Management</p>
          <h1>Welcome back</h1>
          <p class="subtitle">Sign in to manage operations, equipment, and staff schedules.</p>
        </div>

        <form class="login-form" (ngSubmit)="login()">
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              [(ngModel)]="email"
              placeholder="name@lab.com"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              [(ngModel)]="password"
              placeholder="Enter your password"
              required
            />
          </label>

          <div class="form-row">
            <label class="remember-me">
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>
            <a href="#" class="link">Forgot password?</a>
          </div>

          <button type="submit">Sign in</button>
        </form>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      * {
        box-sizing: border-box;
      }

      .login-shell {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #eef5ff 0%, #dfeafc 35%, #f6f7fb 100%);
        padding: 24px;
      }

      .login-card {
        width: min(100%, 980px);
        min-height: 620px;
        display: grid;
        grid-template-columns: 1.1fr 1fr;
        background: rgba(255, 255, 255, 0.84);
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 28px;
        box-shadow: 0 28px 70px rgba(15, 23, 42, 0.12);
        overflow: hidden;
        backdrop-filter: blur(10px);
      }

      .brand-block {
        background: linear-gradient(160deg, #0f172a 0%, #1d4ed8 100%);
        color: white;
        padding: 52px 42px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .brand-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.14);
        font-size: 1.4rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        margin-bottom: 28px;
      }

      .eyebrow {
        margin: 0 0 10px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.72rem;
        color: rgba(255, 255, 255, 0.7);
      }

      h1 {
        margin: 0;
        font-size: clamp(2.4rem, 4vw, 4rem);
        line-height: 1.08;
        letter-spacing: -0.06em;
      }

      .subtitle {
        margin: 18px 0 0;
        max-width: 420px;
        color: rgba(255, 255, 255, 0.75);
        font-size: 1.02rem;
        line-height: 1.7;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 22px;
        background: #ffffff;
        padding: 56px 42px;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: #0f172a;
        font-weight: 600;
        font-size: 0.92rem;
      }

      input {
        width: 100%;
        height: 52px;
        border: 1px solid #dfe7f5;
        border-radius: 14px;
        background: #f8fafc;
        padding: 0 16px;
        font-size: 1rem;
        color: #0f172a;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
      }

      .form-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        margin-top: -6px;
      }

      .remember-me {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        color: #475569;
        font-weight: 500;
      }

      .remember-me input {
        width: 16px;
        height: 16px;
        accent-color: #2563eb;
      }

      .link {
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
      }

      button {
        height: 52px;
        border: none;
        border-radius: 14px;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 16px 28px rgba(37, 99, 235, 0.22);
      }

      button:hover {
        transform: translateY(-1px);
      }

      @media (max-width: 760px) {
        .login-card {
          grid-template-columns: 1fr;
        }

        .brand-block,
        .login-form {
          padding: 32px 24px;
        }

        .form-row {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `,
  ],
})
export class LoginComponent {
  email = '';
  password = '';

  login(): void {
    console.log('Login attempt', { email: this.email, password: this.password });
  }
}
