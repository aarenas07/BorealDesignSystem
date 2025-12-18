import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DatepickerComponent } from './datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ButtonComponent } from '../button/button';

const meta: Meta<DatepickerComponent> = {
  title: 'Atomos/Datepicker',
  component: DatepickerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterTestingModule, ButtonComponent],
      providers: [provideNativeDateAdapter()],
    }),
  ],
  args: {
    fullWidth: false,
    label: '',
    placeholder: 'Placeholder',
    placeholderStartDate: 'Start',
    placeholderEndDate: 'End',
    required: false,
    disabledInput: false,
    disabledPicker: false,
    readonlyInput: false,
    minDate: null,
    maxDate: null,
    startView: 'month',
    startDate: null,
    touchUi: false,
    actionButtons: false,
    nameButtonsCancel: 'Cancel',
    nameButtonsApply: 'Apply',
    appearance: 'outline',
    rangeInputs: false,
    hint: '',
  },
  argTypes: {
    fullWidth: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    placeholderStartDate: { control: 'text' },
    placeholderEndDate: { control: 'text' },
    required: { control: 'boolean' },
    disabledInput: { control: 'boolean' },
    disabledPicker: { control: 'boolean' },
    readonlyInput: { control: 'boolean' },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
    startView: { control: 'select', options: ['month', 'year', 'multi-year'] },
    startDate: { control: 'date' },
    touchUi: { control: 'boolean' },
    actionButtons: { control: 'boolean' },
    nameButtonsCancel: { control: 'text' },
    nameButtonsApply: { control: 'text' },
    appearance: { control: 'select', options: ['fill', 'outline'] },
    rangeInputs: { control: 'boolean' },
    hint: { control: 'text' },
  },
};

export default meta;

export const Basic: StoryObj<DatepickerComponent> = {};

export const Label: StoryObj<DatepickerComponent> = {
  args: {
    label: 'Label',
    placeholder: 'MM/DD/YYYY',
  },
};

export const Placeholder: StoryObj<DatepickerComponent> = {
  args: {
    placeholder: 'MM/DD/YYYY',
  },
};

export const FilledAppearance: StoryObj<DatepickerComponent> = {
  args: {
    appearance: 'fill',
    placeholder: 'MM/DD/YYYY',
  },
};

export const WithHint: StoryObj<DatepickerComponent> = {
  args: {
    placeholder: 'Placeholder',
    hint: 'MM/DD/YYYY',
  },
};

export const TouchUi: StoryObj<DatepickerComponent> = {
  args: {
    touchUi: true,
    placeholder: 'MM/DD/YYYY',
  },
};

export const FullWidth: StoryObj<DatepickerComponent> = {
  args: {
    fullWidth: true,
    placeholder: 'MM/DD/YYYY',
  },
};

export const ReadonlyInput: StoryObj<DatepickerComponent> = {
  args: {
    readonlyInput: true,
    placeholder: 'MM/DD/YYYY',
  },
};

export const DisabledPicker: StoryObj<DatepickerComponent> = {
  args: {
    disabledPicker: true,
    placeholder: 'MM/DD/YYYY',
  },
};

export const DisabledInputPicker: StoryObj<DatepickerComponent> = {
  args: {
    disabledInput: true,
    disabledPicker: true,
    placeholder: 'MM/DD/YYYY',
  },
};

export const Required: StoryObj<DatepickerComponent> = {
  args: {
    required: true,
    placeholder: 'MM/DD/YYYY',
  },
};

export const ActionButtons: StoryObj<DatepickerComponent> = {
  args: {
    actionButtons: true,
    placeholder: 'MM/DD/YYYY',
    nameButtonsCancel: 'Cancelar',
    nameButtonsApply: 'Aplicar',
  },
};

export const MinDate: StoryObj<DatepickerComponent> = {
  args: {
    minDate: new Date(2024, 0, 1),
    placeholder: 'MM/DD/YYYY',
  },
};

export const MaxDate: StoryObj<DatepickerComponent> = {
  args: {
    maxDate: new Date(2026, 11, 31),
    placeholder: 'MM/DD/YYYY',
  },
};

export const StartDate: StoryObj<DatepickerComponent> = {
  args: {
    startDate: new Date(2026, 0, 1),
    placeholder: 'MM/DD/YYYY',
  },
};

export const StartView: StoryObj<DatepickerComponent> = {
  args: {
    startView: 'year',
    placeholder: 'MM/DD/YYYY',
  },
};

export const ValueDate: StoryObj<DatepickerComponent> = {
  args: {
    value: new Date(2026, 0, 1),
    placeholder: 'MM/DD/YYYY',
  },
};

export const ValueChange: StoryObj<DatepickerComponent> = {
  render: args => {
    let dateTmp: Date | null = null;

    return {
      props: {
        ...args,
        valueChangeTmp: dateTmp,
        receiveDate: function (event: Date | null) {
          dateTmp = event;
          this['valueChangeTmp'] = dateTmp;
        },
      },
      template: `
          <bds-datepicker
            [placeholder]="placeholder"
            (valueChange)="receiveDate($event)" 
          ></bds-datepicker>
          <span>change: {{ valueChangeTmp }}</span>
        `,
    };
  },
};

export const FilterDate: StoryObj<DatepickerComponent> = {
  args: {
    hint: 'MM/DD/YYYY',
    label: 'Label',
  },
  render: args => {
    const myFilter = (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();
      return day !== 0 && day !== 6;
    };

    return {
      props: {
        ...args,
        filter: myFilter,
      },
      template: `
          <bds-datepicker
            [label]="label"
            [hint]="hint"
            [filter]="filter"
          ></bds-datepicker>
        `,
    };
  },
};

export const PickerButton: StoryObj<DatepickerComponent> = {
  args: {
    hint: 'MM/DD/YYYY',
    label: 'Label',
    hiddenPicker: true,
  },
  render: args => {
    return {
      props: {
        ...args,
      },
      template: `
          <bds-datepicker 
            #pickerRef 
            [label]="label" 
            [hint]="hint"
            [hiddenPicker]="hiddenPicker">
        </bds-datepicker>
        <bds-button label="Open Picker" (action)="pickerRef.open()"></bds-button>
        `,
    };
  },
};

export const RangeInputs: StoryObj<DatepickerComponent> = {
  args: {
    rangeInputs: true,
    placeholder: 'MM/DD/YYYY',
  },
};
