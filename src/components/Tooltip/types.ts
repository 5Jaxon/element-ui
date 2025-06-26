import type { Placement, Options } from "@popperjs/core";
export interface TooltipProps {
  content?: string;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  manual?: boolean;
  popperOption?: Partial<Options>;
  transition?: 'fade';
  openDelay?: number;
  closeDelay?: number;
}

export interface TooltipEmits {
  (e: 'visable-change', value: boolean): void;
}

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}