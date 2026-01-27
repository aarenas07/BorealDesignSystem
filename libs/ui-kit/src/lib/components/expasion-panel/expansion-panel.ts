import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'bds-expansion-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatExpansionModule],
  templateUrl: './expansion-panel.html',
  styleUrl: './expansion-panel.scss',
})
export class ExpansionPanelComponent {
  @Input() headerColor = '';
  @Input() contentColor = '';

  @HostBinding('style.--bds-expansion-panel-header-bg')
  get headerBgVar(): string | null {
    return this.headerColor || null;
  }

  @HostBinding('style.--bds-expansion-panel-content-bg')
  get contentBgVar(): string | null {
    return this.contentColor || null;
  }
}
