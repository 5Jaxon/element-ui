import type { InjectionKey } from "vue";
import type { RuleItem, ValidateError, ValidateFieldsError } from "async-validator";
export interface FormItemProps {
  label?: string;
  prop?: string;
}

export interface FormRule extends RuleItem {
  trigger?: string;
}

export type FormRules = Record<string, FormRule[]>;

export interface FormProps {
  model?: Record<string, any>;
  rules?: FormRules;
}


export interface FormContext extends FormProps {
  addValidate: (fn: FormItemContext['validate']) => void;
  addReset: (fn: Function) => void;
}

export interface FormItemContext {
  validate: (type: string) => any;
}

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey');
export const formContextKey: InjectionKey<FormContext> = Symbol();