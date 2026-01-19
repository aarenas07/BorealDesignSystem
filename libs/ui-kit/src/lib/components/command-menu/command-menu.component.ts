// generic-command-menu.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CommandComponent } from '../command/command.component';
import { CommandConfig, CommandItem, CommandMenuConfig } from '../../interfaces';


@Component({
  selector: 'lib-ada-command-menu',
  standalone: true,
  imports: [
    CommonModule,
    CommandComponent,
  ],
  templateUrl: './command-menu.component.html',
  styleUrl: './command-menu.component.scss',
})
export class CommandMenuComponent implements OnInit {
  @Input() commandItems: CommandItem[] = [];
  @Input() config: CommandMenuConfig = {};
  @Input() showSearchIcon: boolean = false;
  @Output() commandAction = new EventEmitter<CommandItem>();
  @Output() menuToggle = new EventEmitter<boolean>();

  commandConfig!: CommandConfig;

  ngOnInit() {
    this.initializeCommandConfig();
  }

  private initializeCommandConfig(): void {
    this.commandConfig = {
      visible: false,
      width: this.config.width || '30rem',
      placeholder: this.config.placeholder || '',
    };
  }

  onClick(): void {
    if (this.config.disabled) return;

    this.commandConfig.visible = !this.commandConfig.visible;
    this.menuToggle.emit(this.commandConfig.visible);
  }

  onCommandAction(event: CommandItem): void {
    this.commandAction.emit(event);

    this.commandConfig.visible = false;
    this.menuToggle.emit(false);
  }

  public toggleMenu(visible?: boolean): void {
    this.commandConfig.visible = visible !== undefined ? visible : !this.commandConfig.visible;
    this.menuToggle.emit(this.commandConfig.visible);
  }

  public closeMenu(): void {
    this.commandConfig.visible = false;
    this.menuToggle.emit(false);
  }
}


