import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleSelect } from './example-select';

describe('ExampleSelect', () => {
  let component: ExampleSelect;
  let fixture: ComponentFixture<ExampleSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
