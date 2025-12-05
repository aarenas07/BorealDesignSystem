import { CommonModule } from '@angular/common';
import { FocusTrapFactory, FocusTrap } from '@angular/cdk/a11y';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'lib-side-sheets',
  standalone: true,
  templateUrl: './side-sheets.html',
  styleUrls: ['./side-sheets.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideSheetsComponent {
  @Input() open = false;
  @Input() position: 'start' | 'end' = 'end';
  @Input() size: 'sm' | 'md' | 'lg' | 'full' = 'md';
  @Input() modal = true;
  @Input() closeOnBackdropClick = true;
  @Input() header?: string | TemplateRef<any>;
  @Input() actions?: TemplateRef<any>;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  private focusTrap?: FocusTrap;
  private previouslyFocused?: Element | null;

  constructor(
    private el: ElementRef,
    private focusTrapFactory: FocusTrapFactory
  ) {}

  ngOnChanges() {
    if (this.open) {
      this.activateTrap();
    } else {
      this.destroyTrap();
    }
  }

  activateTrap() {
    this.previouslyFocused = document.activeElement;
    this.focusTrap = this.focusTrapFactory.create(
      this.el.nativeElement.querySelector('.side-sheet')
    );
    this.focusTrap.focusInitialElement();
  }

  destroyTrap() {
    this.focusTrap?.destroy();
    if (this.previouslyFocused instanceof HTMLElement) {
      (this.previouslyFocused as HTMLElement).focus();
    }
  }

  close() {
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }

  onBackdropClick() {
    if (this.closeOnBackdropClick) this.close();
  }

  @HostListener('document:keydown', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (this.open) {
      this.close();
    }
  }
}
