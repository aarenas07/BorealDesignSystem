export interface MenuOptionBds {
  value: string | number | boolean;
  label: string | number;
  img?: string;
  group?: MenuOptionBds[];
}
