import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Footer de la aplicación de documentación
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-info">
          <span class="copyright">
            © {{ currentYear }} Boreal Design System
          </span>
          <span class="separator">•</span>
          <span class="version">v1.0.0</span>
        </div>

        <div class="footer-links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            <mat-icon>code</mat-icon>
            GitHub
          </a>
          <a
            href="https://material.angular.io"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            <mat-icon>open_in_new</mat-icon>
            Angular Material
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      padding: 24px;
      background: var(--sys-surface-container);
      border-top: 1px solid var(--sys-outline-variant);
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      flex-wrap: wrap;
      gap: 16px;
    }

    .footer-info {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--sys-on-surface-variant);
      font-size: 0.875rem;
    }

    .separator {
      opacity: 0.5;
    }

    .footer-links {
      display: flex;
      gap: 16px;
    }

    .footer-link {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--sys-on-surface-variant);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s ease;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      &:hover {
        color: var(--sys-primary);
      }
    }
  `,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
