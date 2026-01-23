import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleBreadcrumb } from './example-breadcrumb';

describe('ExampleBreadcrumb', () => {
  let component: ExampleBreadcrumb;
  let fixture: ComponentFixture<ExampleBreadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleBreadcrumb],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleBreadcrumb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
