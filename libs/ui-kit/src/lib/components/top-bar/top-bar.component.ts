import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ButtonVariant, ButtonColor, ButtonSize } from '../button/button';
import { SidebarStateService } from '../side-bar/services/sidebar-state.service';
import { Subscription } from 'rxjs';

export interface TopBarAction {
  id: string;
  label: string;
  icon?: string;
  variant?: ButtonVariant;
  color?: ButtonColor; // Uses the ButtonColor type from ButtonComponent
  size?: ButtonSize;
  disabled?: boolean;
}

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  // Brand & Navigation Inputs
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() breadcrumb: string = ''; // Can be expanded to an object/array if complex breadcrumbs are needed
  @Input() showBackButton: boolean = false;

  // Action Configuration
  /**
   * List of primary actions to display as buttons.
   * Commonly used when specific context actions are needed.
   */
  @Input() actions: TopBarAction[] = [];

  // System/Utility Toggles (Expressive boolean inputs)
  @Input() showClock: boolean = false;
  @Input() showDocs: boolean = false;
  @Input() showNotifications: boolean = false;
  @Input() showLogout: boolean = true; // Renamed from 'logout' to 'showLogout' for consistency

  // User Profile
  @Input() profileImage: string | null = null;

  // Events
  @Output() backClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<string>(); // Emits the action ID

  @Output() clockClick = new EventEmitter<void>();
  @Output() docsClick = new EventEmitter<void>();
  @Output() notificationsClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();

  sidebarClosed = true;
  private subscription?: Subscription;

  constructor(private sidebarStateService: SidebarStateService) {}

  ngOnInit() {
    this.subscription = this.sidebarStateService.sidebarClosed$.subscribe(isClosed => {
      this.sidebarClosed = isClosed;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onActionClick(actionId: string) {
    this.actionClick.emit(actionId);
  }
}
