import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Layout para la sección de documentación de componentes
 * Wrapper simple que contiene el router-outlet para las páginas de docs
 */
@Component({
  selector: 'app-docs-layout',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-layout">
      <router-outlet />
    </div>
  `,
  styles: `
    .docs-layout {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  `,
})
export class DocsLayoutComponent {}
