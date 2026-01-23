import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleSnackbar } from './example-snackbar';

describe('ExampleSnackbar', () => {
  let component: ExampleSnackbar;
  let fixture: ComponentFixture<ExampleSnackbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleSnackbar],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleSnackbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
