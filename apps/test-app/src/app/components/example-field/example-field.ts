import { Component, signal } from '@angular/core';
import { FormFieldComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-field',
  imports: [FormFieldComponent],
  templateUrl: './example-field.html',
  styleUrl: './example-field.scss',
})
export class ExampleField {
  errorCustomFormField = signal<string>('');

  /**
   * formField
   */
  onFormFieldInput(event: string) {
    if (event === 'error') {
      this.errorCustomFormField.set('Error personalizado');
      return;
    }
    this.errorCustomFormField.set('');
  }
}
