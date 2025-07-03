<template>
  <div class="jx-input" :class="{
    [`jx-input--${type}`]: type,
    [`jx-input--${size}`]: size,
    'is-disabled': disabled,
    'is-prepend': $slots.prepend,
    'is-append': $slots.append,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix,
    'is-focus': isFocus
  }">
    <template v-if="type !== 'textarea'">
      <div class="jx-input__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="jx-input__wrapper">
        <span v-if="$slots.prefix" class="jx-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input v-model="innerValue" class="jx-input__inner" 
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="disabled" @input="handleInput" 
        @focus="handleFocus" @blur="handleBlur"/>
        <span v-if="$slots.suffix || showClear || showPasswordArea" class="jx-input__suffix">
          <slot name="suffix"></slot>
          <Icon icon="times" v-if="showClear" @click="handleClear"></Icon>
          <Icon icon="eye" v-if="passwordVisible && showPasswordArea" @click="passwordVisible = !passwordVisible"></Icon>
          <Icon icon="eye-slash" v-if="!passwordVisible && showPasswordArea" @click="passwordVisible = !passwordVisible"></Icon>
        </span>
      </div>
    </template>
    <template v-else>
      <textarea v-model="innerValue" class="jx-textarea__wrapper" :disabled="disabled" @input="handleInput"></textarea>
    </template>
  </div>
  

</template>

<script setup lang="ts"> 
import { computed, ref, watch } from 'vue';
import type { InputEmits, InputProps } from './types';
import Icon from '../Icon/Icon.vue';

defineOptions({
  name: 'JxInput'
})
const props = withDefaults(defineProps<InputProps>(), { type: 'text' });
const innerValue = ref(props.modelValue);
const isFocus = ref(false);
const passwordVisible = ref(false);

const showClear = computed(()=> {
  return props.clearable &&
  !props.disabled &&
  !!innerValue.value;
})

const showPasswordArea = computed(() => {
  return props.showPassword &&
  !props.disabled && 
  !!innerValue.value;
})  
watch(() => props.modelValue, (v) => {
  innerValue.value = v;
})
const handleInput = () => {  
  emits('update:modelValue', innerValue.value);
}

const handleFocus = () => {  
  isFocus.value = true;
}

const handleBlur = () => {
  isFocus.value = false;
}
const emits = defineEmits<InputEmits>();

const handleClear = () => {
  innerValue.value = '';
  emits('update:modelValue', '');  
    
};
</script>