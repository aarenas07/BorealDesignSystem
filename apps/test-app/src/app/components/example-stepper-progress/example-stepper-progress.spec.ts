import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleStepperProgress } from './example-stepper-progress';

describe('ExampleStepperProgress', () => {
  let component: ExampleStepperProgress;
  let fixture: ComponentFixture<ExampleStepperProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleStepperProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleStepperProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
