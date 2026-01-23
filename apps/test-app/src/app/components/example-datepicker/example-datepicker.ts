import { Component, signal } from '@angular/core';
import { DatepickerComponent, ButtonComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-datepicker',
  imports: [DatepickerComponent, ButtonComponent],
  templateUrl: './example-datepicker.html',
  styleUrl: './example-datepicker.scss',
})
export class ExampleDatepicker {
  private readonly _currentYear = new Date().getFullYear();
  startDate = signal<Date>(new Date(this._currentYear - 1, 0, 1));
  minDate = signal<Date>(new Date(this._currentYear - 100, 0, 1));
  maxDate = signal<Date>(new Date(this._currentYear + 1, 11, 31));
  errorCustomDatepicker = signal<string>('');
  valueDatepicker = signal<Date | null>(new Date(2024, 0, 1));
  valueDatepickerChange = signal<Date | null>(null);
  valueDatepickerRange = signal<{ start: Date | null; end: Date | null }>({ start: new Date(2025, 11, 1), end: new Date(2025, 11, 31) });

  onDatepickerInput(event: Date | null) {
    console.log('onDatepickerInput: ', event);
    if (!event) {
      this.errorCustomDatepicker.set('');
      return;
    }
    const date = new Date(event);
    const day = date.getDate();
    const currentDay = new Date().getDate();

    if (day < currentDay) {
      this.errorCustomDatepicker.set('Error personalizado');
      return;
    }

    this.errorCustomDatepicker.set('');
  }

  receiveDate(event: Date | null) {
    console.log('receiveDate: ', event);
    this.valueDatepickerChange.set(event);
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  receiveDateRange(event: any) {
    console.log('receiveDateRange: ', event);
  }
}
