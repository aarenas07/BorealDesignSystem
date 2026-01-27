import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from './textarea';
import { moduleMetadata } from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<TextareaComponent> = {
  title: 'Atomos/Textarea',
  component: TextareaComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, BrowserAnimationsModule],
    }),
  ],
  args: {
    label: 'Label',
    hint: 'Texto de ayuda',
    prefixIcon: 'search',
    suffixIcon: 'tune',
    appearance: 'outline',
    disabled: false,
    required: false,
    readonly: false,
    fullWidth: false,
  },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    prefixIcon: { control: 'text' },
    suffixIcon: { control: 'text' },
    appearance: {
      control: 'select',
      options: ['fill', 'outline'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Basic: Story = {
  render: args => {
    return {
      props: {
        ...args,
      },
      template: `
        <bds-textarea
          [label]="label"
          [hint]="hint"
          [prefixIcon]="prefixIcon"
          [suffixIcon]="suffixIcon"
          [appearance]="appearance"
          [disabled]="disabled"
          [required]="required"
          [readonly]="readonly"
          [fullWidth]="fullWidth"
            ></bds-textarea>
      `,
    };
  },
};

export const ValidationError: Story = {
  render: args => {
    let customError = '';

    return {
      props: {
        ...args,
        fullWidth: true,
        customError: customError,
        changeTextarea: (event: string) => {
          if (event === 'error') {
            customError = 'Este campo tiene un error forzado';
            return;
          }
          customError = '';
        },
      },
      template: `
        <bds-textarea
          [label]="label"
          [customError]="customError"
          [fullWidth]="fullWidth"
          (valueChange)="changeTextarea($event)"
            ></bds-textarea>
      `,
    };
  },
};
