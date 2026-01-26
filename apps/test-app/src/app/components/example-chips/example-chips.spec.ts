import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChips } from './example-chips';

describe('ExampleChips', () => {
  let component: ExampleChips;
  let fixture: ComponentFixture<ExampleChips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleChips],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleChips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
