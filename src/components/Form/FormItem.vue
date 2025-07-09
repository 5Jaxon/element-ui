<template>
  <div class="jx-form-item"
  :class="{
    'is-error': validateStatus.state === 'error',
    'is-success': validateStatus.state === 'success',
    'is-loading': validateStatus.loading,
    'is-required': isRequired,
  }">
    <div class="jx-form-item__label">
      <slot name="label">
        <label v-if="label" >{{ label }}</label>
      </slot>
    </div>    
    <div class="jx-form-item__content">
      <slot :validate="validateCatch"></slot>
      <div v-if="validateStatus.state === 'error'" class="jx-form-item__error-msg">
        {{ validateStatus.errorMessage }}
      </div>
    </div>    
  </div>

</template>

<script lang="ts" setup>
import { computed, inject, onMounted, provide, reactive } from 'vue';
import type { FormItemProps, FormValidateFailure, FormItemContext } from './types';
import { formItemContextKey, formContextKey } from './types';
import Schema from 'async-validator';
defineOptions({
  name: 'JxFormItem'
});

const validateStatus = reactive({
  state: 'init',
  loading: false,
  errorMessage: ''
});
const props = defineProps<FormItemProps>();
const formContext = inject(formContextKey);
const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && model.hasOwnProperty(props.prop)) {
    return model[props.prop];
  } else return null;
});

const itemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules.hasOwnProperty(props.prop)) {
    return rules[props.prop];
  } else return [];
});

const isRequired = computed(() => {
  const rules = itemRules.value;
  return rules.some(rule => rule.required);
});

const validate = (type: string = '') => {
  const modelName = props.prop;
  let rules;
  
  if (type === '') {
    rules = itemRules.value;
  } else {
    rules = itemRules.value.filter(rule => {
      if (!rule.trigger || rule.trigger === '') return true;
      return rule.trigger === type;
    });
  }

  if (rules.length === 0) {   
    return true;
  }

  if (modelName) {
    const validator = new Schema({
      [modelName]: rules
    });
    validateStatus.loading = true;
    return validator.validate({ [modelName]: innerValue.value})
    .then(() => {
      validateStatus.state = 'success';
    }).catch((e: any) => {
      const { errors } = e;      
      validateStatus.state = 'error';
      validateStatus.errorMessage = (errors && errors.length > 0) ? errors[0].message || '' : '';
      return Promise.reject(e);
    }).finally(() => {
      validateStatus.loading = false;
    });
  }
}

const validateCatch = async (type: string = '') => {
  try {
      await validate(type);
    } catch (e: any) {
    }   
}

const resetValidate = () => {
  validateStatus.state = 'init';
  validateStatus.loading = false;
  validateStatus.errorMessage = '';
}

onMounted(() => {
  if (formContext && formContext.addValidate) {
    formContext.addValidate(validate);
  }
  if (formContext && formContext.addReset) {
    formContext.addReset(resetValidate);
  }
});

const context: FormItemContext = {  
  validate:validateCatch,
};  
provide(formItemContextKey, context);
</script>