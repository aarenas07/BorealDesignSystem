import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChipDropdown } from './example-chip-dropdown';

describe('ExampleChipDropdown', () => {
  let component: ExampleChipDropdown;
  let fixture: ComponentFixture<ExampleChipDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleChipDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleChipDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
