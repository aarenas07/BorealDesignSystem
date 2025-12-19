import { applicationConfig, type Preview } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

const preview: Preview = {
  decorators: [
    // 1. Configuramos el entorno de Angular dentro de Storybook
    applicationConfig({
      providers: [
        // Material necesita animaciones para funcionar (Ripples, tooltips, etc.)
        provideAnimations(),
      ],
    }),
  ],
  parameters: {
    /* docs: {
      codePanel: true, // Mostrar código en el panel de documentación de manera general
    }, */
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
