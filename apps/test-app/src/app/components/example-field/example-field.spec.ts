import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleField } from './example-field';

describe('ExampleField', () => {
  let component: ExampleField;
  let fixture: ComponentFixture<ExampleField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleField],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
