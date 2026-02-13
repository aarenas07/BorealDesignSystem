import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bds-button-ai',
  imports: [],
  templateUrl: './button-ai.html',
  styleUrl: './button-ai.scss',
})
export class ButtonAi {
  @Input() label: string = 'Aurora';
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
