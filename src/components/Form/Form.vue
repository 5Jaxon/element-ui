<template>
  <form class="jx-form">
    <slot></slot>

  </form>
</template>

<script lang="ts" setup>
import type { FormProps } from './types.ts';
import { formItemContextKey } from './types.ts';
import { provide } from 'vue';
const props = defineProps<FormProps>();
defineOptions({
  name: 'JxForm'
});
provide(formItemContextKey, props)
</script>