import { Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { TextareaComponent } from "../textarea/textarea";
import { SelectComponent } from "../select/select";
@Component({
  selector: 'bds-expansion-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIcon,
    TextareaComponent,
    SelectComponent
],
  templateUrl: './expansion-panel.html',
  styleUrl: './expansion-panel.scss',
})
export class ExpansionPanelComponent {
}
