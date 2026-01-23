import { Component, signal } from '@angular/core';
import { TextareaComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-textarea',
  imports: [TextareaComponent],
  templateUrl: './example-textarea.html',
  styleUrl: './example-textarea.scss',
})
export class ExampleTextarea {
  // Textarea
  errorCustomTextarea = signal<string>('');

  /**
   * Textarea
   */
  onTextareaInput(event: string | null) {
    if (event === 'error') {
      this.errorCustomTextarea.set('Error personalizado');
      return;
    }
    this.errorCustomTextarea.set('');
  }
}
