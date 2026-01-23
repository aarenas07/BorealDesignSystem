import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleTable } from './example-table';

describe('ExampleTable', () => {
  let component: ExampleTable;
  let fixture: ComponentFixture<ExampleTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
