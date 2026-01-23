import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleDatepicker } from './example-datepicker';

describe('ExampleDatepicker', () => {
  let component: ExampleDatepicker;
  let fixture: ComponentFixture<ExampleDatepicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleDatepicker],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleDatepicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
