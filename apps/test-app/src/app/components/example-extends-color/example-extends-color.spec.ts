import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleExtendsColor } from './example-extends-color';

describe('ExampleExtendsColor', () => {
  let component: ExampleExtendsColor;
  let fixture: ComponentFixture<ExampleExtendsColor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleExtendsColor],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleExtendsColor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
