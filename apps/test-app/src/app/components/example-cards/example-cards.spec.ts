import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleCards } from './example-cards';

describe('ExampleCards', () => {
  let component: ExampleCards;
  let fixture: ComponentFixture<ExampleCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleCards],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
