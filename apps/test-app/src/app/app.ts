import { Component, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ThemeService } from '@organizacion/ui-kit';
import { ThemeToggleComponent } from './components/toggle-theme/toggle-theme';
import { ExampleButton } from './components/example-button/example-button';
import { ExampleCards } from './components/example-cards/example-cards';
import { ExampleTable } from './components/example-table/example-table';
import { ExampleExpansionPanel } from './components/example-expansion-panel/example-expansion-panel';
import { ExampleStepper } from './components/example-stepper/example-stepper';
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
  ],

  providers: [provideNativeDateAdapter()],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly themeService: ThemeService = inject(ThemeService);

  constructor() {
    this.themeService.setTheme({
      id: 'sicof-light',
      name: 'Sicof Light',
      className: 'sicof-theme-light',
    });
  }
}
