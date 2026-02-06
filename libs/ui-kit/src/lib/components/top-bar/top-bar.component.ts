import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbComponent, MenuItem } from '../breadcrumb/breadcrumb';
import { SidebarStateService } from '../side-bar/services/sidebar-state.service';
import { Subscription } from 'rxjs';
import { ButtonComponent, ButtonVariant } from '../button/button';
import { CommonModule } from '@angular/common';

export interface TopBarAction {
  label: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
}

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, ButtonComponent],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() breadcrumbItems: MenuItem[] = [];
  
  @Input() primaryAction?: TopBarAction;
  @Input() secondaryAction?: TopBarAction;
  @Input() tertiaryAction?: TopBarAction;
  
  @Input() profileImage: string = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  isProfileOpen = false;
  sidebarClosed = true;
  private subscription?: Subscription;

  constructor(private sidebarStateService: SidebarStateService) {}

  ngOnInit() {
    this.subscription = this.sidebarStateService.sidebarClosed$.subscribe(
      (isClosed) => {
        this.sidebarClosed = isClosed;
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toggleProfile(event: MouseEvent) {
    event.stopPropagation();
    this.isProfileOpen = !this.isProfileOpen;
  }

  @HostListener('document:click')
  closeProfile() {
    if (this.isProfileOpen) {
      this.isProfileOpen = false;
    }
  }
}
