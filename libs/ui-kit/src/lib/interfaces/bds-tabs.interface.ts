import { TemplateRef } from '@angular/core';

export interface TabsBds {
  label: string;
  icon?: string;
  disabled?: boolean;
  contentTemplate?: TemplateRef<any>;
}
