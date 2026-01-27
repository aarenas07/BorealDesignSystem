import type { Meta, StoryObj } from '@storybook/angular';
import { SideBarComponent } from './side-bar.component';
import { expect } from '@storybook/test';

const meta: Meta<SideBarComponent> = {
  component: SideBarComponent,
  title: 'SideBarComponent',
};
export default meta;

type Story = StoryObj<SideBarComponent>;

export const Primary: Story = {
  args: {
    sidebarData: [],
    adminMenuConfig: {
      icon: 'home',
      shortcut: 'Ctrl + K',
      placeholder: 'Buscar...',
    },
    userAvatar: '',
    userName: '',
    quickActions: [{ label: '+ ' }],
  },
};

export const Heading: Story = {
  args: {
    sidebarData: [],
    adminMenuConfig: {
      icon: 'home',
      shortcut: 'Ctrl + K',
      placeholder: 'Buscar...',
    },
    userAvatar: '',
    userName: '',
    quickActions: [{ label: '+ ' }],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/side-bar/gi)).toBeTruthy();
  },
};
