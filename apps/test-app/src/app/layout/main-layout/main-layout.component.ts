import {
  Component,
  signal,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { FooterComponent } from '../footer/footer.component';

/**
 * Layout principal de la aplicación de documentación
 * Gestiona el sidenav responsive y la estructura general
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="layout-container">
      <app-header (menuToggle)="toggleSidenav()" />

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav
          #sidenav
          [mode]="isMobile() ? 'over' : 'side'"
          [opened]="!isMobile()"
          [fixedInViewport]="true"
          [fixedTopGap]="64"
          class="sidenav"
        >
          <app-sidenav />
        </mat-sidenav>

        <mat-sidenav-content class="content-container">
          <main class="main-content">
            <router-outlet />
          </main>
          <app-footer />
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: `
    .layout-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .sidenav-container {
      flex: 1;
      background: var(--sys-surface);
    }

    .sidenav {
      width: 280px;
      border-right: 1px solid var(--sys-outline-variant);
      background: var(--sys-surface);
    }

    .content-container {
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 64px);
      background: var(--sys-surface);
    }

    .main-content {
      flex: 1;
      padding: 32px;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;

      @media (max-width: 599px) {
        padding: 16px;
      }
    }
  `,
})
export class MainLayoutComponent {
  private readonly sidenav = viewChild<MatSidenav>('sidenav');

  /** Indica si el viewport es mobile */
  readonly isMobile = signal(false);

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        this.isMobile.set(result.matches);
      });
  }

  /**
   * Alterna el estado del sidenav (abierto/cerrado)
   */
  toggleSidenav(): void {
    this.sidenav()?.toggle();
  }
}
