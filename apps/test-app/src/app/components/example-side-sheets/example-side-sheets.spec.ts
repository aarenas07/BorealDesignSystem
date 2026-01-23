import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleSideSheets } from './example-side-sheets';

describe('ExampleSideSheets', () => {
  let component: ExampleSideSheets;
  let fixture: ComponentFixture<ExampleSideSheets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleSideSheets],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleSideSheets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
