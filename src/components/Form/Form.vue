<template>
  <form class="jx-form">
    <slot></slot>

  </form>
</template>

<script lang="ts" setup>
import type { FormItemContext, FormProps } from './types.ts';
import { formContextKey } from './types.ts';
import { provide } from 'vue';
const props = defineProps<FormProps>();
defineOptions({
  name: 'JxForm'
});

const validateList: FormItemContext['validate'][] = [];
const resetList: Function[] = [];
function addValidate(fn: FormItemContext['validate']) {
  validateList.push(fn);
}
function addReset(fn: Function) {
  resetList.push(fn);
}

async function validateAll() {
  let res;
  await Promise.all(validateList.map(fn => fn(''))).then(() => { res = true }, e => { res = e });
  return res;
}

function resetAll() {
  resetList.forEach(fn => fn());
}

provide(formContextKey, {
  ...props,
  addValidate,
  addReset,
})

defineExpose({
  validateAll,
  resetAll
});
</script>