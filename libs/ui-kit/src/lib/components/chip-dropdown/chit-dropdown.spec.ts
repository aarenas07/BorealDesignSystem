import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChitDropdown } from './chit-dropdown';

describe('ChitDropdown', () => {
  let component: ChitDropdown;
  let fixture: ComponentFixture<ChitDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChitDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(ChitDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
