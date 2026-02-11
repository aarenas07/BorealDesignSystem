import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ThemeService } from '@organizacion/ui-kit';

/**
 * Componente raíz de la aplicación de documentación
 * Solo contiene el router-outlet ya que el layout se maneja en MainLayoutComponent
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [provideNativeDateAdapter()],
  template: `<router-outlet />`,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
  `,
})
export class App {
  private readonly themeService: ThemeService = inject(ThemeService);

  constructor() {
    // Establecer tema por defecto
    this.themeService.setTheme({
      id: 'sicof-light',
      name: 'Sicof Light',
      className: 'sicof-theme-light',
    });
  }
}
