export type SwitchValue = boolean | string | number;

export interface SwitchProps {
  modelValue?: SwitchValue;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  inactiveValue?: SwitchValue;
  activeValue?: SwitchValue;
  name?: string;
  id?: string;
  size?: 'small' | 'large';
}

export interface SwitchEmits {
  (event: 'update:modelValue', value: SwitchValue): void;
  (event: 'change', value: SwitchValue): void;
}
