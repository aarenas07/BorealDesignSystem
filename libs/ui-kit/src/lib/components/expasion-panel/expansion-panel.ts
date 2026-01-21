import { Component } from '@angular/core';
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
export class ExpansionPanelComponent {}
