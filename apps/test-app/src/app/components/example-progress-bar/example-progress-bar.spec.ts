import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleProgressBar } from './example-progress-bar';

describe('ExampleProgressBar', () => {
  let component: ExampleProgressBar;
  let fixture: ComponentFixture<ExampleProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleProgressBar],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleProgressBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
