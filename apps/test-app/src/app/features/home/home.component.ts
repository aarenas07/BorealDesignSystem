import {
  Component,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DocumentationService } from '../../core/services/documentation.service';

/**
 * Página de inicio de la documentación
 * Presenta la librería con hero, features y preview de componentes
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-badge">
            <mat-icon>verified</mat-icon>
            <span>Angular 20 + Material Design 3</span>
          </div>

          <h1 class="hero-title">
            Construye interfaces
            <span class="highlight">modernas y consistentes</span>
          </h1>

          <p class="hero-description">
            Boreal Design System es una librería de componentes Angular
            construida sobre Angular Material con un sistema de theming
            avanzado, accesibilidad integrada y diseño adaptable.
          </p>

          <div class="hero-actions">
            <button mat-flat-button class="primary-action" (click)="navigateTo('/getting-started')">
              <mat-icon>rocket_launch</mat-icon>
              Comenzar
            </button>
            <button mat-stroked-button class="secondary-action" (click)="navigateTo('/docs')">
              <mat-icon>widgets</mat-icon>
              Ver Componentes
            </button>
          </div>

          <div class="hero-stats">
            <div class="stat">
              <span class="stat-value">{{ componentCount }}</span>
              <span class="stat-label">Componentes</span>
            </div>
            <div class="stat">
              <span class="stat-value">13</span>
              <span class="stat-label">Temas</span>
            </div>
            <div class="stat">
              <span class="stat-value">100%</span>
              <span class="stat-label">TypeScript</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-card">
            <div class="card-header">
              <div class="card-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div class="card-content">
              <div class="mock-component">
                <div class="mock-form">
                  <div class="mock-input"></div>
                  <div class="mock-button"></div>
                </div>
                <div class="mock-table">
                  <div class="mock-row"></div>
                  <div class="mock-row"></div>
                  <div class="mock-row"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <h2 class="section-title">¿Por qué Boreal?</h2>

        <div class="features-grid">
          @for (feature of features; track feature.title) {
            <mat-card class="feature-card" appearance="outlined">
              <mat-card-header>
                <div class="feature-icon" mat-card-avatar>
                  <mat-icon>{{ feature.icon }}</mat-icon>
                </div>
                <mat-card-title>{{ feature.title }}</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>{{ feature.description }}</p>
              </mat-card-content>
            </mat-card>
          }
        </div>
      </section>

      <!-- Components Preview -->
      <section class="components-preview">
        <h2 class="section-title">Componentes Destacados</h2>
        <p class="section-description">
          Explora algunos de nuestros componentes más utilizados
        </p>

        <div class="components-grid">
          @for (component of featuredComponents; track component.id) {
            <button
              class="component-preview"
              (click)="navigateTo(component.route)"
            >
              <mat-icon class="component-icon">{{ component.icon }}</mat-icon>
              <span class="component-name">{{ component.name }}</span>
              <span class="component-desc">{{ component.description }}</span>
              <mat-icon class="arrow-icon">arrow_forward</mat-icon>
            </button>
          }
        </div>

        <div class="view-all">
          <button mat-stroked-button (click)="navigateTo('/docs')">
            Ver todos los componentes
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
      </section>

      <!-- Quick Start Section -->
      <section class="quick-start">
        <mat-card class="quick-start-card" appearance="filled">
          <mat-card-content>
            <div class="quick-start-content">
              <div class="quick-start-text">
                <h3>¿Listo para empezar?</h3>
                <p>
                  Sigue nuestra guía paso a paso para integrar Boreal Design
                  System en tu proyecto Angular.
                </p>
              </div>
              <button mat-flat-button (click)="navigateTo('/getting-started')">
                <mat-icon>menu_book</mat-icon>
                Ver documentación
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </section>
    </div>
  `,
  styles: `
    .home-page {
      display: flex;
      flex-direction: column;
      gap: 80px;
    }

    /* Hero Section */
    .hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
      min-height: 60vh;
      padding: 32px 0;

      @media (max-width: 959px) {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 32px;
      }
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 24px;

      @media (max-width: 959px) {
        align-items: center;
      }
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 100px;
      background: var(--sys-primary-container);
      color: var(--sys-on-primary-container);
      font-size: 0.875rem;
      font-weight: 500;
      width: fit-content;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.1;
      margin: 0;
      color: var(--sys-on-surface);

      .highlight {
        display: block;
        background: linear-gradient(
          135deg,
          var(--sys-primary) 0%,
          var(--sys-tertiary) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      @media (max-width: 599px) {
        font-size: 2.5rem;
      }
    }

    .hero-description {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--sys-on-surface-variant);
      margin: 0;
      max-width: 540px;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;

      @media (max-width: 599px) {
        justify-content: center;
      }

      button {
        height: 48px;
        padding: 0 24px;
        font-size: 1rem;

        mat-icon {
          margin-right: 8px;
        }
      }

      .primary-action {
        background: var(--sys-primary);
        color: var(--sys-on-primary);
      }

      .secondary-action {
        border-color: var(--sys-outline);
        color: var(--sys-on-surface);
      }
    }

    .hero-stats {
      display: flex;
      gap: 32px;
      margin-top: 16px;

      .stat {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--sys-primary);
      }

      .stat-label {
        font-size: 0.875rem;
        color: var(--sys-on-surface-variant);
      }
    }

    /* Hero Visual */
    .hero-visual {
      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: 959px) {
        display: none;
      }
    }

    .hero-card {
      width: 100%;
      max-width: 400px;
      border-radius: 16px;
      background: var(--sys-surface-container);
      border: 1px solid var(--sys-outline-variant);
      overflow: hidden;
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
    }

    .card-header {
      padding: 12px 16px;
      background: var(--sys-surface-container-high);
      border-bottom: 1px solid var(--sys-outline-variant);
    }

    .card-dots {
      display: flex;
      gap: 8px;

      span {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--sys-outline-variant);
      }
    }

    .card-content {
      padding: 24px;
    }

    .mock-component {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .mock-form {
      display: flex;
      gap: 12px;

      .mock-input {
        flex: 1;
        height: 40px;
        border-radius: 8px;
        background: var(--sys-surface);
        border: 1px solid var(--sys-outline-variant);
      }

      .mock-button {
        width: 80px;
        height: 40px;
        border-radius: 8px;
        background: var(--sys-primary);
      }
    }

    .mock-table {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .mock-row {
        height: 32px;
        border-radius: 8px;
        background: var(--sys-surface);
        border: 1px solid var(--sys-outline-variant);

        &:first-child {
          background: var(--sys-primary-container);
        }
      }
    }

    /* Features Section */
    .features {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
      text-align: center;
      color: var(--sys-on-surface);
    }

    .section-description {
      font-size: 1rem;
      color: var(--sys-on-surface-variant);
      text-align: center;
      margin: -16px 0 0 0;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .feature-card {
      height: 100%;

      .feature-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: var(--sys-primary-container);
        color: var(--sys-on-primary-container);
      }

      p {
        color: var(--sys-on-surface-variant);
        line-height: 1.6;
      }
    }

    /* Components Preview */
    .components-preview {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .components-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .component-preview {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      padding: 20px;
      border-radius: 16px;
      border: 1px solid var(--sys-outline-variant);
      background: var(--sys-surface);
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
      position: relative;

      &:hover {
        background: var(--sys-surface-container-low);
        border-color: var(--sys-primary);

        .arrow-icon {
          opacity: 1;
          transform: translateX(4px);
        }
      }

      .component-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
        color: var(--sys-primary);
        margin-bottom: 4px;
      }

      .component-name {
        font-size: 1rem;
        font-weight: 600;
        color: var(--sys-on-surface);
      }

      .component-desc {
        font-size: 0.875rem;
        color: var(--sys-on-surface-variant);
        line-height: 1.5;
      }

      .arrow-icon {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        color: var(--sys-primary);
        opacity: 0;
        transition: all 0.2s ease;
      }
    }

    .view-all {
      display: flex;
      justify-content: center;
      margin-top: 16px;

      button {
        mat-icon {
          margin-left: 8px;
        }
      }
    }

    /* Quick Start */
    .quick-start-card {
      background: var(--sys-primary-container);
    }

    .quick-start-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 24px;

      @media (max-width: 599px) {
        flex-direction: column;
        text-align: center;
      }

      h3 {
        margin: 0 0 8px 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--sys-on-primary-container);
      }

      p {
        margin: 0;
        color: var(--sys-on-primary-container);
        opacity: 0.9;
      }

      button {
        white-space: nowrap;
        background: var(--sys-on-primary-container);
        color: var(--sys-primary-container);

        mat-icon {
          margin-right: 8px;
        }
      }
    }
  `,
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly docService = inject(DocumentationService);

  /** Número total de componentes */
  readonly componentCount = this.docService.components().length;

  /** Componentes destacados para mostrar en preview */
  readonly featuredComponents = this.docService.components().slice(0, 6);

  /** Features principales de la librería */
  readonly features = [
    {
      icon: 'palette',
      title: 'Theming Avanzado',
      description:
        'Sistema de temas completo con soporte para modo claro/oscuro, alto contraste y paletas de colores personalizadas.',
    },
    {
      icon: 'accessibility_new',
      title: 'Accesibilidad',
      description:
        'Componentes diseñados siguiendo las guías WCAG con soporte completo para lectores de pantalla y navegación por teclado.',
    },
    {
      icon: 'speed',
      title: 'Alto Rendimiento',
      description:
        'Optimizado con OnPush change detection, signals y lazy loading para aplicaciones rápidas y eficientes.',
    },
    {
      icon: 'code',
      title: 'TypeScript Estricto',
      description:
        'Tipos completos y APIs bien documentadas para una experiencia de desarrollo superior.',
    },
  ];

  /**
   * Navega a una ruta específica
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
