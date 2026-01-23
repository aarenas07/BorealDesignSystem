import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleCheckbox } from './example-checkbox';

describe('ExampleCheckbox', () => {
  let component: ExampleCheckbox;
  let fixture: ComponentFixture<ExampleCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleCheckbox],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
