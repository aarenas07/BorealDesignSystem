import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressCircularComponent } from './progress-circular';

describe('ProgressCircularComponent', () => {
  let component: ProgressCircularComponent;
  let fixture: ComponentFixture<ProgressCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressCircularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
