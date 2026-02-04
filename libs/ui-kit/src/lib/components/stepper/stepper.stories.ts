import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { StepperComponent } from './stepper';
import { BdsStepContentDirective } from '../../directives/bds-step-content.directive';

const meta: Meta<StepperComponent> = {
  component: StepperComponent,
  title: 'Atomos/Stepper',
  decorators: [
    moduleMetadata({
      imports: [StepperComponent, BdsStepContentDirective],
    }),
  ],
  args: {
    steps: [
      {
        label: 'Step 1',
        description: 'Description 1',
      },
      {
        label: 'Step 2',
        description: 'Description 2',
      },
      {
        label: 'Step 3',
        description: 'Description 3',
      },
    ],
    orientation: 'horizontal',
    linear: false,
  },

  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    linear: {
      control: 'boolean',
    },
    activeIndex: {
      control: 'number',
    },
    steps: {
      control: 'object',
    },
  },
};
export default meta;

type Story = StoryObj<StepperComponent>;

export const Default: Story = {
  args: {
    activeIndex: 0,
    orientation: 'horizontal',
    linear: false,
  },
};

export const directiveTemplate: Story = {
  render: args => ({
    props: args,
    template: `
    <bds-stepper [(activeIndex)]="activeIndex" [orientation]="orientation" [linear]="linear" [steps]="steps">
      <ng-template bdsStepContent="0">
        Text 1
      </ng-template>
      <ng-template bdsStepContent="1">
        Text 2
      </ng-template>
      <ng-template bdsStepContent="2">
        Text 3
      </ng-template>
    </bds-stepper>
    `,
  }),
  args: {
    activeIndex: 0,
    orientation: 'horizontal',
    linear: false,
  },
};
