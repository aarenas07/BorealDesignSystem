import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleButton } from './example-button';

describe('ExampleButton', () => {
  let component: ExampleButton;
  let fixture: ComponentFixture<ExampleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
