import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChitDropdownComponent } from './chit-dropdown';

describe('ChitDropdownComponent', () => {
  let component: ChitDropdownComponent;
  let fixture: ComponentFixture<ChitDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChitDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChitDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
