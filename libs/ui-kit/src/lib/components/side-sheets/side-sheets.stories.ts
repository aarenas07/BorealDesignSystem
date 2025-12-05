import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SideSheetsComponent } from './side-sheets';

const meta: Meta<SideSheetsComponent> = {
  title: 'Molecules/SideSheets',
  component: SideSheetsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
};

export default meta;
type Story = StoryObj<SideSheetsComponent>;

export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `<lib-side-sheets></lib-side-sheets>`,
  }),
  parameters: {
    layout: 'centered',
  },
};
