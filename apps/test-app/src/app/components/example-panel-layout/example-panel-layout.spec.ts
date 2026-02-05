import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamplePanelLayout } from './example-panel-layout';

describe('ExamplePanelLayout', () => {
  let component: ExamplePanelLayout;
  let fixture: ComponentFixture<ExamplePanelLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamplePanelLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamplePanelLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
