export type SelectAppearance = 'fill' | 'outline';
export type SelectOption = {
  value: string | number;
  label: string | number;
  img?: string;
  group?: SelectOption[];
};
