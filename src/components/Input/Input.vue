<template>
  <div class="jx-input" :class="{
    [`jx-input--${type}`]: type,
    [`jx-input--${size}`]: size,
    'is-disabled': disabled,
    'is-prepend': $slots.prepend,
    'is-append': $slots.append,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix
  }">
    <template v-if="type !== 'textarea'">
      <div class="jx-input__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="jx-input__wrapper">
        <span v-if="$slots.prefix" class="jx-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input v-model="innerValue" class="jx-input__inner" :type="type" :disabled="disabled" @input="handleInput" />
        <span v-if="$slots.suffix" class="jx-input__suffix">
          <slot name="suffix"></slot>
        </span>
      </div>
    </template>
    <template v-else>
      <textarea v-model="innerValue" class="jx-textarea__wrapper" :disabled="disabled" @input="handleInput"></textarea>
    </template>
  </div>
  

</template>

<script setup lang="ts"> 
import { ref, watch } from 'vue';
import type { InputEmits, InputProps } from './types';

defineOptions({
  name: 'JxInput'
})
const props = withDefaults(defineProps<InputProps>(), { type: 'text' });
const innerValue = ref(props.modelValue);
watch(() => props.modelValue, (v) => {
  innerValue.value = v;
})
const handleInput = () => {  
  emits('update:modelValue', innerValue.value);
}
const emits = defineEmits<InputEmits>();
</script>