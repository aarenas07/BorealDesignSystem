import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleOtpInput } from './example-otp-input';

describe('ExampleOtpInput', () => {
  let component: ExampleOtpInput;
  let fixture: ComponentFixture<ExampleOtpInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleOtpInput],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleOtpInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
