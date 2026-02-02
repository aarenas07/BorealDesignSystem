import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleSmartStepper } from './example-stepper';

describe('ExampleSmartStepper', () => {
  let component: ExampleSmartStepper;
  let fixture: ComponentFixture<ExampleSmartStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleSmartStepper],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleSmartStepper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
