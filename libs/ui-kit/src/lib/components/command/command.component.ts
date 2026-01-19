import { Component, input, output, effect, inject, viewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommandItem } from '../../interfaces';


@Component({
  selector: 'lib-ada-command',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './command.component.html',
  styleUrl: './command.component.scss'
})
export class CommandComponent {

  readonly dialog = inject(MatDialog);
  dialogTemplate = viewChild.required<TemplateRef<any>>('commandDialog');
  dialogRef: MatDialogRef<any> | null = null;

  inputFilter = new FormControl('');
  config = input({
    visible: false,
    width: '45rem',
    placeholder: 'Ir a una página o ejecutar alguna acción...'
  });
  commandItems = input<CommandItem[]>();

  // Outputs
  commandEmitter = output<CommandItem>();
  closeEmitter = output<void>();

  filteredItems: CommandItem[] | undefined = [];

  constructor() {
    // Remove effect as it doesn't track deep mutation. We use ngDoCheck instead.
  }

  ngDoCheck() {
    // Manually check for visibility changes because parent mutates the config object
    // and signals don't track deep mutation unless reference changes.
    // This mimics the previous p-dialog behavior which used DoCheck/OnChanges.
    const visible = this.config().visible;
    if (visible && !this.dialogRef) {
      this.openDialog();
    } else if (!visible && this.dialogRef) {
      this.closeDialog();
    }
  }

  ngOnInit() {
    window.addEventListener('keydown', this.handleKeyboardShortcut);
    this.filteredItems = this.commandItems();
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this.handleKeyboardShortcut);
  }

  openDialog() {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(this.dialogTemplate(), {
        width: this.config().width,
        panelClass: 'command-dialog-panel',
        position: { top: '50px' },
        autoFocus: false,
        restoreFocus: false
      });

      this.dialogRef.afterClosed().subscribe(() => {
        this.dialogRef = null;
        // When closing via backdrop/escape, we must update the source of truth
        this.config().visible = false;
        this.closeEmitter.emit();
      });
    }
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

  filter() {
    if (this.commandItems()?.length) {
      this.filteredItems = this.inputFilter?.value !== ''
        ? this.commandItems()?.filter(item => item.label.toLocaleLowerCase().includes(this.inputFilter?.value!.toLocaleLowerCase()))
        : this.commandItems();
    }
  }

  itemSelected(item: CommandItem) {
    this.commandEmitter.emit(item);
    this.closeDialog();
  }

  handleKeyboardShortcut = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      const current = this.config();
      // Toggle visibility on source of truth
      current.visible = !current.visible;

      // Since we mutated the object, ngDoCheck will pick it up on next CD cycle.
      // But we can also force it immediately if outside Angular Zone? 
      // Keyboard events from window.addEventListener *might* be patched by Zone,
      // but usually are. So ngDoCheck should run automatically.
    }
  };
}

