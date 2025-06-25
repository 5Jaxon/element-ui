export interface AlertProps {
  content?: string;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  effect?: 'light' | 'dark';
  closable?: boolean
}

export interface AlertEmit {
  (e: 'close'): void;
  (e: 'open'): void;
}

export interface Instance {
  'close': () => void;
  'open': () => void;
}
