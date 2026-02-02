import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleSpinner } from './example-spinner';

describe('ExampleSpinner', () => {
  let component: ExampleSpinner;
  let fixture: ComponentFixture<ExampleSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleSpinner],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleSpinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
