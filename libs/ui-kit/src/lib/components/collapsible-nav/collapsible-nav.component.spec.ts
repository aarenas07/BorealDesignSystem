import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CollapsibleNavComponent } from './collapsible-nav.component';

describe('CollapsibleNavComponent', () => {
    let component: CollapsibleNavComponent;
    let fixture: ComponentFixture<CollapsibleNavComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CollapsibleNavComponent, RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(CollapsibleNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should start collapsed by default', () => {
        expect(component.isExpanded).toBe(false);
    });

    it('should toggle expansion state', () => {
        expect(component.isExpanded).toBe(false);
        component.toggle();
        expect(component.isExpanded).toBe(true);
        component.toggle();
        expect(component.isExpanded).toBe(false);
    });

    it('should emit expandedChange on toggle', () => {
        spyOn(component.expandedChange, 'emit');
        component.toggle();
        expect(component.expandedChange.emit).toHaveBeenCalledWith(true);
    });

    it('should expand when expand() is called', () => {
        component.expand();
        expect(component.isExpanded).toBe(true);
    });

    it('should collapse when collapse() is called', () => {
        component.isExpanded = true;
        component.collapse();
        expect(component.isExpanded).toBe(false);
    });

    it('should use default config values', () => {
        expect(component.toggleIcon).toBe('menu');
        expect(component.closeIcon).toBe('close');
        expect(component.tooltipPosition).toBe('right');
    });

    it('should emit itemClick when item is clicked', () => {
        spyOn(component.itemClick, 'emit');
        const item = { id: 'test', label: 'Test Item' };
        component.onItemClick(item);
        expect(component.itemClick.emit).toHaveBeenCalledWith(item);
    });
    it('should NOT collapse when clicked outside if pinned', () => {
        component.isExpanded = true;
        component.isPinned = true;
        component.config.behavior!.closeOnClickOutside = true;

        // Simular clic fuera del elemento
        const event = new MouseEvent('click', { bubbles: true });
        Object.defineProperty(event, 'target', { value: document.body });

        component.onDocumentClick(event);

        expect(component.isExpanded).toBe(true);
    });

    it('should collapse when clicked outside if NOT pinned', () => {
        component.isExpanded = true;
        component.isPinned = false;
        component.config.behavior!.closeOnClickOutside = true;

        // Simular clic fuera del elemento
        const event = new MouseEvent('click', { bubbles: true });
        Object.defineProperty(event, 'target', { value: document.body });

        component.onDocumentClick(event);

        expect(component.isExpanded).toBe(false);
    });
});
