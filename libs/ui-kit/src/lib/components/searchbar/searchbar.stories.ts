import type { Meta, StoryObj } from '@storybook/angular';
import { SearchbarComponent } from './searchbar';

const meta: Meta<SearchbarComponent> = {
  title: 'Atomos/Searchbar',
  component: SearchbarComponent,
  argTypes: {
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<SearchbarComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Buscar...',
  },
};
