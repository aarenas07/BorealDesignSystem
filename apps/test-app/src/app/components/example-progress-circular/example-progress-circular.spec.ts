import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleProgressCircular } from './example-progress-circular';

describe('ExampleProgressCircular', () => {
  let component: ExampleProgressCircular;
  let fixture: ComponentFixture<ExampleProgressCircular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleProgressCircular],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleProgressCircular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
