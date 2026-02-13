import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputAi } from './input-ai';

describe('InputAi', () => {
  let component: InputAi;
  let fixture: ComponentFixture<InputAi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAi],
    }).compileComponents();

    fixture = TestBed.createComponent(InputAi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
