import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleAlert } from './example-alert';

describe('ExampleAlert', () => {
  let component: ExampleAlert;
  let fixture: ComponentFixture<ExampleAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleAlert],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
