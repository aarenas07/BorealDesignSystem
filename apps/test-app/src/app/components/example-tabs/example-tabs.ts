import { AfterViewInit, Component, model, signal, TemplateRef, ViewChild } from '@angular/core';
import { TabsBds, TabsComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-tabs',
  imports: [TabsComponent],
  templateUrl: './example-tabs.html',
  styleUrl: './example-tabs.scss',
})
export class ExampleTabs implements AfterViewInit {
  //Tabs
  optionsTabs = signal<TabsBds[]>([]);
  optionsTabsIcons = signal<TabsBds[]>([
    { label: 'Icon 1', icon: 'thumb_up', disabled: false },
    { label: 'Icon 2', icon: 'thumb_down', disabled: false },
  ]);
  optionsTabsDraggable = signal<TabsBds[]>([
    { label: 'Draggable 1', icon: 'thumb_up', disabled: false },
    { label: 'Draggable 2', icon: 'thumb_down', disabled: false },
  ]);
  optionsTabsDisabled = signal<TabsBds[]>([
    { label: 'Active', icon: 'thumb_up', disabled: false },
    { label: 'Disabled', icon: 'thumb_down', disabled: true },
  ]);

  selectedTabIndex = model<number>(0);
  @ViewChild('contentTab1') contentTab1!: TemplateRef<any>;
  @ViewChild('contentTab2') contentTab2!: TemplateRef<any>;
  @ViewChild('contentTab3') contentTab3!: TemplateRef<any>;

  ngAfterViewInit(): void {
    this.optionsTabs.set([
      { label: 'One', disabled: false, contentTemplate: this.contentTab1 },
      { label: 'Two', disabled: false, contentTemplate: this.contentTab2 },
      { label: 'Three', disabled: false, contentTemplate: this.contentTab3 },
    ]);
  }
}
