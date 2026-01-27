import { Component, signal } from '@angular/core';
import { ExpansionPanelComponent, TextareaComponent, SelectComponent, MenuOptionBds } from '@organizacion/ui-kit';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-example-expansion-panel',
  imports: [ExpansionPanelComponent, MatExpansionModule, MatIcon, TextareaComponent, SelectComponent],
  templateUrl: './example-expansion-panel.html',
  styleUrl: './example-expansion-panel.scss',
})
export class ExampleExpansionPanel {
  optionsSelect = signal<MenuOptionBds[]>([
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]);
}
