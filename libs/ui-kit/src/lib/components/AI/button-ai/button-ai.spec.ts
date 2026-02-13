import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonAi } from './button-ai';

describe('ButtonAi', () => {
  let component: ButtonAi;
  let fixture: ComponentFixture<ButtonAi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAi],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonAi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
