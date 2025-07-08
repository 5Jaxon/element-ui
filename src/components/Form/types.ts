import type { InjectionKey } from "vue";
import type { RuleItem, ValidateError, ValidateFieldsError } from "async-validator";
export interface FormItemProps {
  label?: string;
  prop?: string;
}

export type FormRules = Record<string, RuleItem[]>;

export interface FormProps {
  model?: Record<string, any>;
  rules?: FormRules;
}

export interface FormItemContext extends FormProps {

}

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol();