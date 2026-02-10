import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutPanelComponent } from './panel-layout';
import { Component, signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Test host component to test inputs/outputs
@Component({
  template: `
    <bds-panel-layout [isOpen]="isOpen()" [panelWidth]="panelWidth()" [panelTitle]="panelTitle()" (closePanel)="onClose()">
      <div main>Main Content</div>
      <div panel>Panel Content</div>
    </bds-panel-layout>
  `,
  standalone: true,
  imports: [LayoutPanelComponent],
})
class TestHostComponent {
  isOpen = signal(false);
  panelWidth = signal(400);
  panelTitle = signal('');
  closeEventCalled = false;

  onClose() {
    this.closeEventCalled = true;
  }
}

describe('LayoutPanelComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let bdsPanel: LayoutPanelComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

    // Find the LayoutPanelComponent instance
    bdsPanel = fixture.debugElement.children[0].componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(bdsPanel).toBeTruthy();
  });

  it('should verify has default inputs', () => {
    expect(bdsPanel.panelWidth()).toBe(400);
    expect(bdsPanel.isOpen()).toBe(false);
  });

  it('should update effectiveWidth based on panelWidth input', () => {
    // Default is 400
    expect(bdsPanel.effectiveWidth()).toContain('min(400px, 50vw)');

    // Update input
    component.panelWidth.set(600);
    fixture.detectChanges();

    expect(bdsPanel.effectiveWidth()).toContain('min(600px, 50vw)');
  });

  it('should emit closePanel when close button is clicked', () => {
    spyOn(component, 'onClose').and.callThrough();

    // Simulate open to make sure elements are interactive if needed (though implementation doesn't hide them from DOM completely yet unless using ngIf, but style might hide)
    component.isOpen.set(true);
    fixture.detectChanges();

    // Trigger the close method directly on the component as we are testing logic,
    // or we could find the button in DOM
    bdsPanel.onClose();

    expect(component.onClose).toHaveBeenCalled();
  });
});
