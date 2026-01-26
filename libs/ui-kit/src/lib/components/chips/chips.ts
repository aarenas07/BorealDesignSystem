import { Component, effect, input, model, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ChipsTypeBds } from '../../interfaces/bds-chips.enum';
import { ChipsListBds } from '../../interfaces/bds-chips.interface';

@Component({
  selector: 'bds-chips',
  imports: [
    MatChipsModule,
    MatFormField,
    MatLabel,
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './chips.html',
  styleUrl: './chips.scss',
  host: {
    '[class.bds-chip]': '"default"',
  },
})
export class ChipsComponent {
  type = input<ChipsTypeBds>('chip');
  options = input<ChipsListBds[]>([]);
  labelChipsRow = input<string>('');
  placeholderChipsRow = input<string>('');
  optionsSelected = model<ChipsListBds[]>([]);
  preffixIcon = input<boolean>(false);
  sufixIcon = input<boolean>(false);

  onChangeList = output<MatChipListboxChange>();
  onChangeRow = output<ChipsListBds[]>();

  readonly formControl = new FormControl();

  constructor() {
    effect(() => {
      this.optionsSelected.set(this.options());
    });
  }

  _onChangeList(event: MatChipListboxChange) {
    this.onChangeList.emit(event);
  }

  private _onChangeRow() {
    this.onChangeRow.emit(this.formControl.value);
  }

  removeReactiveOption(item: ChipsListBds) {
    this.optionsSelected.update(option => {
      const index = option.indexOf(item);
      if (index < 0) {
        this.formControl.setValue(option);
        return option;
      }

      option.splice(index, 1);
      this.formControl.setValue([...option]);
      return [...option];
    });
    this._onChangeRow();
  }

  addReactiveOption(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our option
    if (value) {
      this.optionsSelected.update(option => [...option, { label: value }]);
      this.formControl.setValue(this.optionsSelected());
    }

    // Clear the input value
    event.chipInput!.clear();
    this._onChangeRow();
  }
}
