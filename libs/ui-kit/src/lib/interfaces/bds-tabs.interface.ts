import { TemplateRef } from '@angular/core';

export interface TabsBds {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  contentTemplate?: TemplateRef<any>;
}
