import { Ref, InjectionKey } from "vue";

export type NameType = string | number;

export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (item: NameType) => void;
}

export const CollapseContextKey: InjectionKey<CollapseContext> = Symbol();