<template>
  <div class="jx-form-item"
  :class="{
    'is-error': validateStatus.state === 'error',
    'is-success': validateStatus.state === 'success',
    'is-loading': validateStatus.loading,
  }">
    <slot name="label">
      <label v-if="label" class="jx-form-item__label">{{ label }}</label>
    </slot>
    <slot></slot>
    <div v-if="validateStatus.state === 'error'" class="jx-form-item__error-msg">
      {{ validateStatus.errorMessage }}
    </div>
    {{ innerValue }}-{{ itemRules }}
    <span @click="validate">validate</span>
  </div>

</template>

<script lang="ts" setup>
import { computed, inject, reactive } from 'vue';
import type { FormItemProps, FormValidateFailure } from './types';
import { formItemContextKey } from './types';
import type { RuleItem } from 'async-validator';
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
const formContext = inject(formItemContextKey);
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

const validate = () => {
  const modelName = props.prop;
  if (modelName) {
    const validator = new Schema({
      [modelName]: itemRules.value
    });
    validateStatus.loading = true;
    validator.validate({ [modelName]: innerValue.value})
    .then(() => {
      console.log('Validation passed');
      validateStatus.state = 'success';
    }).catch((e: FormValidateFailure) => {
      const { errors, fields } = e;
      console.log('Validation failed:', errors, fields);
      validateStatus.state = 'error';
      validateStatus.errorMessage = (errors && errors.length > 0) ? errors[0].message || '' : '';
    }).finally(() => {
      validateStatus.loading = false;
    });
  }
}
</script>