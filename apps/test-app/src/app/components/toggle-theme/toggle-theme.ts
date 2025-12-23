import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ITheme, ThemeService, ButtonComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-theme-toggle',
  imports: [ButtonComponent],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
  readonly themes: ITheme[] = ThemeService.themes;

  themeChange(theme: ITheme): void {
    this.themeService.setTheme(theme);
    console.log('theme_1: ', this.themeService.defaultTheme);
  }
}
