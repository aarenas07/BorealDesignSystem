export interface AlertActionBds {
  label: string;
  variant: 'filled' | 'text';
  action: () => void;
}
