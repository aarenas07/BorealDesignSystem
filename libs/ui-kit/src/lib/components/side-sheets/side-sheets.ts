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
  ViewChild,
  model,
  input,
} from '@angular/core';

export type SideSheetPosition = 'start' | 'end';
export type SideSheetSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-side-sheets',
  standalone: true,
  templateUrl: './side-sheets.html',
  styleUrls: ['./side-sheets.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideSheetsComponent {
  open = model<boolean>(false);
  position = input<SideSheetPosition>('end');
  size = input<SideSheetSize>('md');
  fullWidth = input<boolean>(false);
  modal = input<boolean>(true);
  closeOnBackdropClick = input<boolean>(true);
  header = input<string>('');

  @Input() actions?: TemplateRef<any>;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();
  @ViewChild('actionsTemplate', { static: false })
  actionsTemplate!: TemplateRef<any>;

  private focusTrap?: FocusTrap;
  private previouslyFocused?: Element | null;

  constructor(
    private el: ElementRef,
    private focusTrapFactory: FocusTrapFactory
  ) {}

  ngOnChanges() {
    if (this.open()) {
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
    this.open.set(false);
    this.openChange.emit(false);
    this.closed.emit();
  }

  onBackdropClick() {
    if (this.closeOnBackdropClick()) this.close();
  }

  @HostListener('document:keydown', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      if (this.open()) {
        this.close();
      }
    }
  }
}
