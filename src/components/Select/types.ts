export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type CustomFilterFn = (value: string) => SelectOption[];

export interface SelectProps {
  modelValue?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  filterMethod?: CustomFilterFn;
}

export interface SelectState {
  label: string;
  value: string;
  selected: SelectOption | null;
}

export interface SelectEmits {
  (e: 'change', value: string): void;
  (e: 'update:modelValue', value: string): void;
  (e: 'visibleChange', value: boolean): void;
  (e: 'clear'): void;
}