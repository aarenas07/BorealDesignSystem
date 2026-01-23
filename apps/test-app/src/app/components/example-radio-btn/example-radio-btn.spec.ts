import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleRadioBtn } from './example-radio-btn';

describe('ExampleRadioBtn', () => {
  let component: ExampleRadioBtn;
  let fixture: ComponentFixture<ExampleRadioBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleRadioBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleRadioBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
