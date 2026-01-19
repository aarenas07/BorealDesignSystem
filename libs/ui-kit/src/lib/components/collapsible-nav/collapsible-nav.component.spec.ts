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
        expect(component.isExpanded).toBeFalse();
    });

    it('should toggle expansion state', () => {
        expect(component.isExpanded).toBeFalse();
        component.toggle();
        expect(component.isExpanded).toBeTrue();
        component.toggle();
        expect(component.isExpanded).toBeFalse();
    });

    it('should emit expandedChange on toggle', () => {
        spyOn(component.expandedChange, 'emit');
        component.toggle();
        expect(component.expandedChange.emit).toHaveBeenCalledWith(true);
    });

    it('should expand when expand() is called', () => {
        component.expand();
        expect(component.isExpanded).toBeTrue();
    });

    it('should collapse when collapse() is called', () => {
        component.isExpanded = true;
        component.collapse();
        expect(component.isExpanded).toBeFalse();
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
});
