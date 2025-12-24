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
  decorators: [
    moduleMetadata({
      imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterTestingModule, ButtonComponent],
      providers: [provideNativeDateAdapter()],
    }),
  ],
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    placeholderStartDate: 'Start',
    placeholderEndDate: 'End',
    hint: 'Texto de ayuda',
    required: false,
    disabledInput: false,
    disabledPicker: false,
    readonlyInput: false,
    fullWidth: false,
    touchUi: false,
    actionButtons: false,
    rangeInputs: false,
    minDate: null,
    maxDate: null,
    startDate: null,
    startView: 'month',
    nameButtonsCancel: 'Cancel',
    nameButtonsApply: 'Apply',
    appearance: 'outline',
    filter: (d: Date | null): boolean => {
      return true;
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    placeholderStartDate: { control: 'text' },
    placeholderEndDate: { control: 'text' },
    hint: { control: 'text' },
    required: { control: 'boolean' },
    disabledInput: { control: 'boolean' },
    disabledPicker: { control: 'boolean' },
    readonlyInput: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    touchUi: { control: 'boolean' },
    actionButtons: { control: 'boolean' },
    rangeInputs: { control: 'boolean' },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
    startDate: { control: 'date' },
    startView: { control: 'select', options: ['month', 'year', 'multi-year'] },
    nameButtonsCancel: { control: 'text' },
    nameButtonsApply: { control: 'text' },
    appearance: { control: 'select', options: ['fill', 'outline'] },
    filter: { control: 'object' },
  },
};

export default meta;

export const Basic: StoryObj<DatepickerComponent> = {};

export const MinDate: StoryObj<DatepickerComponent> = {
  args: {
    minDate: new Date(2024, 0, 1),
  },
};

export const MaxDate: StoryObj<DatepickerComponent> = {
  args: {
    maxDate: new Date(2026, 11, 31),
  },
};

export const StartDate: StoryObj<DatepickerComponent> = {
  args: {
    startDate: new Date(2026, 0, 1),
  },
};

export const ValueDate: StoryObj<DatepickerComponent> = {
  args: {
    value: new Date(2026, 0, 1),
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

export const RangeInputsPickerButton: StoryObj<DatepickerComponent> = {
  args: {
    rangeInputs: true,
    hiddenPicker: true,
    placeholderStartDate: 'MM/DD/YYYY',
    placeholderEndDate: 'MM/DD/YYYY',
  },
  render: args => {
    return {
      props: {
        ...args,
      },
      template: `
        <bds-datepicker 
          #pickerRangeRef 
          [rangeInputs]="rangeInputs" 
          [hiddenPicker]="hiddenPicker" 
          [placeholderStartDate]="placeholderStartDate" 
          [placeholderEndDate]="placeholderEndDate">
        </bds-datepicker>
        <bds-button label="Open Picker" (action)="pickerRangeRef.open()"></bds-button>
        `,
    };
  },
};

export const RangeInputsValueRange: StoryObj<DatepickerComponent> = {
  args: {
    rangeInputs: true,
    placeholderStartDate: 'MM/DD/YYYY',
    placeholderEndDate: 'MM/DD/YYYY',
    valueRange: { start: new Date(2026, 0, 1), end: new Date(2026, 0, 1) },
  },
  render: args => {
    return {
      props: {
        ...args,
      },
      template: `
        <bds-datepicker 
          [rangeInputs]="rangeInputs" 
          [valueRange]="valueRange" 
          [placeholderStartDate]="placeholderStartDate" 
          [placeholderEndDate]="placeholderEndDate">
        </bds-datepicker> 
        `,
    };
  },
};
