import { NgTemplateOutlet } from '@angular/common';
import { Component, Output, EventEmitter, TemplateRef, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

export type RailTooltipType = 'dark' | 'light' | 'error' | 'success';
export type tooltipPositionType = 'right' | 'left' | 'top' | 'bottom';

// Renombrar SidebarItem a RailItem
export interface RailItem {
  id: string;
  icon?: string;
  label: string;
  route?: string;
  isActive?: boolean;
  badge?: number;
  children?: RailItem[];
}

// Renombrar SidebarSection a RailSection
export interface RailSection {
  key: string;
  items: RailItem[];
  tooltipType?: RailTooltipType;
  cssClass?: string;
  showSeparator?: boolean;
}

// RailConfig ya está bien nombrado
export interface RailConfig {
  sections: RailSection[];
  tooltipPosition?: tooltipPositionType;
}

@Component({
  selector: 'bds-rail',
  imports: [NgTemplateOutlet],
  standalone: true,
  templateUrl: './rail.component.html',
  styleUrl: './rail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RailComponent {
  config = input<RailConfig>({ sections: [] });
  items = input<any>(null); // Para retrocompatibilidad

  // Permite parametrizar la posición del tooltip globalmente o por sección
  tooltipPosition = input<tooltipPositionType | undefined>(undefined);

  // Permite parametrizar el tipo de tooltip globalmente o por sección
  tooltipType = input<RailTooltipType | undefined>(undefined);

  // Permite parametrizar la clase CSS de los ítems globalmente o por sección
  itemCssClass = input<string | undefined>(undefined);

  // Permite pasar un template personalizado para los ítems
  itemTemplate = input<TemplateRef<any> | undefined>(undefined);

  @Output() itemClick = new EventEmitter<RailItem>();

  get railSections(): RailSection[] {
    // Si se usa el formato antiguo, convertirlo al nuevo
    if (this.items() && !this.config().sections.length) {
      return this.convertLegacyFormat(this.items());
    }
    return this.config().sections;
  }

  get effectiveTooltipPosition(): string {
    // Prioriza el input, luego config, luego 'right'
    return this.tooltipPosition() || this.config().tooltipPosition || 'right';
  }

  getSectionTooltipType(section: RailSection): string {
    // Prioriza el input, luego sección, luego 'dark'
    return this.tooltipType() || section.tooltipType || 'dark';
  }

  getSectionCssClass(section: RailSection): string {
    // Prioriza el input, luego sección, luego default
    return this.itemCssClass() || section.cssClass || 'items-container';
  }

  onItemClick(item: RailItem) {
    this.itemClick.emit(item);
  }

  private convertLegacyFormat(items: any[]): RailSection[] {
    const sections: RailSection[] = [];

    if (items[0]) {
      const data = items[0];

      const sectionMappings = [
        { key: 'principalItems', tooltipType: 'dark' as const, cssClass: 'principal-items-container' },
        { key: 'modulesItems', tooltipType: 'dark' as const, cssClass: 'modules-items-container' },
        { key: 'aditionalItems', tooltipType: 'error' as const, cssClass: 'additional-items-container' },
        { key: 'additionalItems', tooltipType: 'error' as const, cssClass: 'additional-items-container' },
      ];

      sectionMappings.forEach((mapping, index) => {
        if (data[mapping.key]) {
          sections.push({
            key: mapping.key,
            items: data[mapping.key],
            tooltipType: mapping.tooltipType,
            cssClass: mapping.cssClass,
            showSeparator: index < sectionMappings.length - 1,
          });
        }
      });
    }

    return sections;
  }
}
