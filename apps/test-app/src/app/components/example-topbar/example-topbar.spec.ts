import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleTopbar } from './example-topbar';

describe('ExampleTopbar', () => {
  let component: ExampleTopbar;
  let fixture: ComponentFixture<ExampleTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleTopbar]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleTopbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
