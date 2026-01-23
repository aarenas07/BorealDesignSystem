import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleCollapsibleNav } from './example-collapsible-nav';

describe('ExampleCollapsibleNav', () => {
  let component: ExampleCollapsibleNav;
  let fixture: ComponentFixture<ExampleCollapsibleNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleCollapsibleNav],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleCollapsibleNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
