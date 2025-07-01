import type { VNode } from "vue";
export interface CreateMessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'info' | 'error' | 'warning';
  offset?: number;
}

export interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'info' | 'error' | 'warning';
  offset?: number;
  id: string;
  onDestory: () => void;
}

export interface MessageContext {
  id: string;
  vnode: VNode;
  props: MessageProps;
  bottom?: number;
}

