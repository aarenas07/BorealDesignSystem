import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleTextarea } from './example-textarea';

describe('ExampleTextarea', () => {
  let component: ExampleTextarea;
  let fixture: ComponentFixture<ExampleTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleTextarea],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleTextarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
