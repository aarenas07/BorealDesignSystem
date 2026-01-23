import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleTooltip } from './example-tooltip';

describe('ExampleTooltip', () => {
  let component: ExampleTooltip;
  let fixture: ComponentFixture<ExampleTooltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleTooltip],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleTooltip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
