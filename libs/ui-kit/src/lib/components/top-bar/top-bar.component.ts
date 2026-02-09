import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { SidebarStateService } from '../side-bar/services/sidebar-state.service';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../button/button';

export interface BreadcrumbItem {
  label: string; // Texto que se muestra
  route?: string; // Ruta para navegación (opcional)
  icon?: string; // Icono Material Symbols (opcional)
  disabled?: boolean; // Si está deshabilitado (opcional)
  data?: any; // Datos adicionales (opcional)
}

export interface BreadcrumbConfig {
  separator?: string; // Separador entre items (default: '/')
  showHome?: boolean; // Mostrar botón de inicio (default: false)
  homeRoute?: string; // Ruta del inicio (default: '/')
  homeLabel?: string; // Texto del inicio (default: 'Inicio')
  homeIcon?: string; // Icono del inicio (default: undefined)
  maxItems?: number; // Máximo de items a mostrar (default: 0 = sin límite)
  showIcons?: boolean; // Mostrar iconos (default: true)
  clickableLastItem?: boolean; // Último item clickeable (default: false)
  customClass?: string; // Clase CSS adicional (default: '')
}

@Component({
  selector: 'app-top-bar',
  imports: [ButtonComponent],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @Input() breadcrumbItems: BreadcrumbItem[] = [];
  @Input() breadcrumbConfig: BreadcrumbConfig = {
    showHome: true, // Mostrar botón inicio
    separator: '›', // Separador personalizado
    homeRoute: '/', // Ruta personalizada del inicio
    homeLabel: '', // Texto personalizado del inicio
    homeIcon: '', // Icono del inicio
    maxItems: 4, // Máximo 4 items (con "..." si excede)
    showIcons: true, // Mostrar iconos
    clickableLastItem: false, // Último item no clickeable
    customClass: 'my-breadcrumb', // Clase CSS adicional
  };
  @Input() showClock: boolean = false;
  @Input() showDocs: boolean = false;
  @Input() showHelp: boolean = false;
  @Input() showNotifications: boolean = false;
  @Input() profileImage: string = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  @Input() logout: boolean = true;

  @Output() clockClick = new EventEmitter<void>();
  @Output() docsClick = new EventEmitter<void>();
  @Output() helpClick = new EventEmitter<void>();
  @Output() notificationsClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  sidebarClosed = true;
  private subscription?: Subscription;

  constructor(private sidebarStateService: SidebarStateService) {}

  ngOnInit() {
    // Escucha los cambios del estado del sidebar
    this.subscription = this.sidebarStateService.sidebarClosed$.subscribe(isClosed => {
      this.sidebarClosed = isClosed;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
