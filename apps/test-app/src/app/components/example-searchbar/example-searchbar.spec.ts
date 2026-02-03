import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleSearchbar } from './example-searchbar';

describe('ExampleSearchbar', () => {
  let component: ExampleSearchbar;
  let fixture: ComponentFixture<ExampleSearchbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleSearchbar],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleSearchbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
