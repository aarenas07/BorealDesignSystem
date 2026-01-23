import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleExpansionPanel } from './example-expansion-panel';

describe('ExampleExpansionPanel', () => {
  let component: ExampleExpansionPanel;
  let fixture: ComponentFixture<ExampleExpansionPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleExpansionPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleExpansionPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
