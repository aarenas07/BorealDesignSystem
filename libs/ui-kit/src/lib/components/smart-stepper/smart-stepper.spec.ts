import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmartStepperComponent } from './smart-stepper';

describe('SmartStepperComponent', () => {
  let component: SmartStepperComponent;
  let fixture: ComponentFixture<SmartStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmartStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
