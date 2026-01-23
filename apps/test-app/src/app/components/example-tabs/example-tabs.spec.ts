import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleTabs } from './example-tabs';

describe('ExampleTabs', () => {
  let component: ExampleTabs;
  let fixture: ComponentFixture<ExampleTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
