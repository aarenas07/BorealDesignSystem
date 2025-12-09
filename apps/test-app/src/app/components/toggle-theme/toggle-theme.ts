import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { ITheme, ThemeService } from '@organizacion/ui-kit';



@Component({
  selector: 'app-theme-toggle',
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);

  readonly themes: ITheme[] = ThemeService.themes;

  themeChange(theme: MatButtonToggleChange): void {
    this.themeService.setTheme(this.themes.find(t => t.id === theme.value) || this.themes[0]);
  }
}