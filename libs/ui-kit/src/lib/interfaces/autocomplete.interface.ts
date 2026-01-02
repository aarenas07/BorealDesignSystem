export type AutocompleteAppearance = 'fill' | 'outline';
export type MenuOptionBds = {
  value: string | number;
  label: string | number;
  img?: string;
  group?: MenuOptionBds[];
};
