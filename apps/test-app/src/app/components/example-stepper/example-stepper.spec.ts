import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleStepper } from './example-stepper';

describe('ExampleStepper', () => {
  let component: ExampleStepper;
  let fixture: ComponentFixture<ExampleStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleStepper],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleStepper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
