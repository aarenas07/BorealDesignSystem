import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleSidebarComponent } from './example-sidebar';

describe('ExampleSidebarComponent', () => {
  let component: ExampleSidebarComponent;
  let fixture: ComponentFixture<ExampleSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
