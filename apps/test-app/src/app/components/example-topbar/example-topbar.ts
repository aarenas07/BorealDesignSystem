import { Component } from '@angular/core';
import { TopBarComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-topbar',
  imports: [TopBarComponent],
  templateUrl: './example-topbar.html',
  styleUrl: './example-topbar.scss'
})
export class ExampleTopbar {
  breadcrumbs = [
    { label: 'Inicio', routerLink: '/' },
    { label: 'Proyectos', routerLink: '/projects' },
    { label: 'Detalle del Proyecto', active: true }
  ];

  primaryAction = {
    label: 'Guardar',
    icon: 'save',
    onClick: () => console.log('Primary Action Clicked'),
    variant: 'filled' as const
  };

  secondaryAction = {
    label: 'Cancelar',
    icon: 'close',
    onClick: () => console.log('Secondary Action Clicked'),
    variant: 'outlined' as const
  };

  tertiaryAction = {
    label: 'Ayuda',
    icon: 'help',
    onClick: () => console.log('Tertiary Action Clicked'),
    variant: 'text' as const
  };
}
