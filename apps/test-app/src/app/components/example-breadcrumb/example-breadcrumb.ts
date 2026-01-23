import { Component, signal } from '@angular/core';
import { BreadcrumbComponent, MenuItem } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-breadcrumb',
  imports: [BreadcrumbComponent],
  templateUrl: './example-breadcrumb.html',
  styleUrl: './example-breadcrumb.scss',
})
export class ExampleBreadcrumb {
  //breadcrumb
  items = signal<MenuItem[]>([
    { label: 'Library', routerLink: '/' },
    { label: 'Data', routerLink: '/' },
    { label: 'Item', routerLink: '/', active: true },
  ]);

  itemsText = signal<MenuItem[]>([
    { label: 'Users', icon: 'group' },
    { label: 'User', icon: 'person' },
    { label: 'View', icon: 'visibility', active: true },
  ]);

  itemsIcons = signal<MenuItem[]>([
    { label: 'Users', icon: 'groups', routerLink: '/' },
    { label: 'User', icon: 'person', routerLink: '/' },
    { label: 'View', icon: 'visibility', routerLink: '/', active: true },
  ]);

  itemsLinks = signal<MenuItem[]>([
    { label: 'Page 1', icon: 'view_module', link: 'https://www.google.com/' },
    { label: 'Page 2', icon: 'list', link: 'https://www.google.com/' },
    { label: 'Page 3', active: true },
  ]);
}
