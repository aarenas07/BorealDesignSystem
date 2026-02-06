import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploaderComponent } from './uploader';

describe('UploaderComponent', () => {
  let component: UploaderComponent;
  let fixture: ComponentFixture<UploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept files on drop', () => {
    const mockFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const mockEvent = {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: { files: [mockFile] }
    } as any;

    component.onDrop(mockEvent);
    expect(component.uploadedFiles().length).toBe(1);
  });

  it('should validate file size', () => {
    const largeFile = new File(['x'.repeat(100 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    const files = [largeFile];
    
    let errorEmitted = false;
    component.error.subscribe(() => errorEmitted = true);
    
    component['processFiles'](files);
    expect(errorEmitted).toBe(true);
  });
});
