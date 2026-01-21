import { Component, input, model, output, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { TabsBds } from '../../interfaces';

export type AlignTabs = 'start' | 'center' | 'end';

@Component({
  selector: 'bds-tabs',
  imports: [MatTabsModule, MatIcon, NgTemplateOutlet, CdkDrag, CdkDropList],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent {
  alignTabs = input<AlignTabs>('start');
  stretchTabs = input<boolean>(false);
  primaryTabs = input<boolean>(true);
  animationDuration = input<string>('300ms');
  selectedTabIndex = model<number>(0);
  selectedTabChange = output<MatTabChangeEvent>();
  optionsNavTabs = input<TabsBds[]>([]);
  draggableTabs = input<boolean>(false);

  _selectedTabChange(event: MatTabChangeEvent) {
    this.selectedTabChange.emit(event);
  }

  bdsDrop(event: CdkDragDrop<TabsBds[]>) {
    const prevActive = this.optionsNavTabs()[this.selectedTabIndex()];
    moveItemInArray(this.optionsNavTabs(), event.previousIndex, event.currentIndex);
    this.selectedTabIndex.set(this.optionsNavTabs().indexOf(prevActive));
  }
}
