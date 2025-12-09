import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

export interface MenuItem {
  icon?: string;
  label?: string;
  routerLink?: string;
  link?: string;
  active?: boolean;
}

@Component({
  selector: 'bds-breadcrumb',
  imports: [RouterModule, MatIcon],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class BreadcrumbComponent {
  home = input<MenuItem>();
  items = input<MenuItem[]>([]);
}
