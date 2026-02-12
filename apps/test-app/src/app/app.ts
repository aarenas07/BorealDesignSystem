import { Component, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ThemeService, TopBarComponent, TopBarAction, MenuItem } from '@organizacion/ui-kit';
import { ThemeToggleComponent } from './components/toggle-theme/toggle-theme';
import { ExampleButton } from './components/example-button/example-button';
import { ExampleCards } from './components/example-cards/example-cards';
import { ExampleTable } from './components/example-table/example-table';
import { ExampleExpansionPanel } from './components/example-expansion-panel/example-expansion-panel';
import { ExampleStepper } from './components/example-stepper/example-stepper';
import { ExampleSmartStepper } from './components/example-smart-stepper/example-smart-stepper';
import { ExampleSideSheets } from './components/example-side-sheets/example-side-sheets';
import { ExampleBreadcrumb } from './components/example-breadcrumb/example-breadcrumb';
import { ExampleAlert } from './components/example-alert/example-alert';
import { ExampleTextarea } from './components/example-textarea/example-textarea';
import { ExampleField } from './components/example-field/example-field';
import { ExampleDatepicker } from './components/example-datepicker/example-datepicker';
import { ExampleAutocomplete } from './components/example-autocomplete/example-autocomplete';
import { ExampleTooltip } from './components/example-tooltip/example-tooltip';
import { ExampleForm } from './components/example-form/example-form';
import { ExampleSelect } from './components/example-select/example-select';
import { ExampleRadioBtn } from './components/example-radio-btn/example-radio-btn';
import { ExampleCheckbox } from './components/example-checkbox/example-checkbox';
import { ExampleTabs } from './components/example-tabs/example-tabs';
import { ExampleSnackbar } from './components/example-snackbar/example-snackbar';
import { ExampleCollapsibleNav } from './components/example-collapsible-nav/example-collapsible-nav';
import { ExampleExtendsColor } from './components/example-extends-color/example-extends-color';
import { ExampleOtpInput } from './components/example-otp-input/example-otp-input';
import { ExampleChips } from './components/example-chips/example-chips';
import { ExampleSidebarComponent } from './components/example-sidebar/example-sidebar';
import { ExampleUploader } from './components/example-uploader/example-uploader';
import { ExampleChipDropdown } from './components/example-chip-dropdown/example-chip-dropdown';
import { ExampleStepperProgress } from './components/example-stepper-progress/example-stepper-progress';
import { ExampleProgressBar } from './components/example-progress-bar/example-progress-bar';
import { ExampleSearchbar } from './components/example-searchbar/example-searchbar';
import { ExamplePanelLayoutComponent } from './components/example-panel-layout/example-panel-layout';
import { ExampleProgressCircular } from './components/example-progress-circular/example-progress-circular';
import { ExampleTopbar } from './components/example-topbar/example-topbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ThemeToggleComponent,
    ExampleButton,
    ExampleCards,
    ExampleTable,
    ExampleExpansionPanel,
    ExampleStepper,
    ExampleSmartStepper,
    ExampleSideSheets,
    ExampleBreadcrumb,
    ExampleAlert,
    ExampleTextarea,
    ExampleField,
    ExampleDatepicker,
    ExampleAutocomplete,
    ExampleTooltip,
    ExampleForm,
    ExampleSelect,
    ExampleRadioBtn,
    ExampleCheckbox,
    ExampleTabs,
    ExampleSnackbar,
    ExampleCollapsibleNav,
    ExampleExtendsColor,
    ExampleOtpInput,
    ExampleChips,
    ExampleSidebarComponent,
    ExampleUploader,
    ExampleChipDropdown,
    ExampleStepperProgress,
    ExampleProgressBar,
    ExampleSearchbar,
    ExamplePanelLayoutComponent,
    ExampleProgressCircular,
    TopBarComponent,
  ],

  providers: [provideNativeDateAdapter()],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly themeService: ThemeService = inject(ThemeService);

  topBarActions: TopBarAction[] = [
    {
      id: 'action1',
      label: 'Action 1',
      variant: 'elevated',
      color: 'secondary',
      icon: 'add',
    },
    {
      id: 'action2',
      label: 'Action 2',
      variant: 'outlined',
      color: 'secondary',
      icon: 'edit',
    },
    {
      id: 'action3',
      label: 'Action 3',
      variant: 'filled',
      color: 'primary',
      icon: '',
    },
  ];

  myBreadcrumbItems: MenuItem[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'Section', routerLink: '/section' },
    { label: 'Current Page', active: true },
  ];

  constructor() {
    this.themeService.setTheme({
      id: 'sicof-light',
      name: 'Sicof Light',
      className: 'sicof-theme-light',
    });
  }

  onBack() {
    console.log('Back clicked');
  }

  onActionClick(actionId: string) {
    console.log('Action clicked:', actionId);
  }

  onClockClick() {
    console.log('Clock clicked');
  }

  onDocsClick() {
    console.log('Docs clicked');
  }

  onNotificationsClick() {
    console.log('Notifications clicked');
  }

  onLogoutClick() {
    console.log('Logout clicked');
  }

  onProfileClick() {
    console.log('Profile clicked');
  }
}
