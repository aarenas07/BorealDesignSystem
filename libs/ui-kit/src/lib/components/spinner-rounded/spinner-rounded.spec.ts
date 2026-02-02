import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerRoundedComponent } from './spinner-rounded';

describe('SpinnerRoundedComponent', () => {
  let component: SpinnerRoundedComponent;
  let fixture: ComponentFixture<SpinnerRoundedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerRoundedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerRoundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
