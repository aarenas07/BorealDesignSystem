import { NgTemplateOutlet } from '@angular/common';
import { FocusTrapFactory, FocusTrap } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  HostListener,
  TemplateRef,
  ChangeDetectionStrategy,
  model,
  input,
  output,
  inject,
  ContentChild,
} from '@angular/core';

export type SideSheetPosition = 'start' | 'end';
export type SideSheetSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'bds-side-sheets',
  standalone: true,
  templateUrl: './side-sheets.html',
  styleUrls: ['./side-sheets.scss'],
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideSheetsComponent {
  open = model<boolean>(false);
  modal = input<boolean>(true);
  fullWidth = input<boolean>(false);
  closeOnBackdropClick = input<boolean>(true);
  position = input<SideSheetPosition>('end');
  size = input<SideSheetSize>('md');
  header = input<string>('');
  openChange = output<boolean>();
  closed = output<void>();

  @ContentChild('actionsTemplate', { static: false })
  actionsTemplate!: TemplateRef<any>;

  private focusTrap?: FocusTrap;
  private previouslyFocused?: Element | null;

  private readonly el: ElementRef = inject(ElementRef);
  private readonly focusTrapFactory: FocusTrapFactory = inject(FocusTrapFactory);

  ngOnChanges() {
    if (this.open()) {
      this.activateTrap();
    } else {
      this.destroyTrap();
    }
  }

  activateTrap() {
    this.previouslyFocused = document.activeElement;
    this.focusTrap = this.focusTrapFactory.create(this.el.nativeElement.querySelector('.bds-side-sheet'));
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
