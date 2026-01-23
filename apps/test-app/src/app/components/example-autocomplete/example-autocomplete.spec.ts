import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleAutocomplete } from './example-autocomplete';

describe('ExampleAutocomplete', () => {
  let component: ExampleAutocomplete;
  let fixture: ComponentFixture<ExampleAutocomplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleAutocomplete],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleAutocomplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
