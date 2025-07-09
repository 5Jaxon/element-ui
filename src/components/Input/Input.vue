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
        <input v-model="innerValue" class="jx-input__inner" ref="inputRef"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="disabled" @input="handleInput" @change="handleChange" 
        @focus="handleFocus" @blur="handleBlur" v-bind="$attrs"/>
        <span v-if="$slots.suffix || showClear || showPasswordArea"
        class="jx-input__suffix" @click="keepFocus" >
          <slot name="suffix"></slot>
          <Icon icon="times" v-if="showClear" @click="handleClear" @mousedown.prevent="() => {}"></Icon>
          <Icon icon="eye" v-if="passwordVisible && showPasswordArea" @click="passwordVisible = !passwordVisible"></Icon>
          <Icon icon="eye-slash" v-if="!passwordVisible && showPasswordArea" @click="passwordVisible = !passwordVisible"></Icon>
        </span>
      </div>
    </template>
    <template v-else>
      <textarea v-model="innerValue" class="jx-textarea__wrapper" ref="inputRef"
      :disabled="disabled" @input="handleInput" @change="handleChange"
      @focus="handleFocus" @blur="handleBlur" v-bind="$attrs"></textarea>
    </template>
  </div>
  

</template>

<script setup lang="ts"> 
import { computed, inject, nextTick, ref, watch } from 'vue';
import type { InputEmits, InputProps } from './types';
import Icon from '../Icon/Icon.vue';
import { formItemContextKey } from '../Form/types';

defineOptions({
  name: 'JxInput',
  // inheritAttrs: false
})
const props = withDefaults(defineProps<InputProps>(), { type: 'text', autocomplete: 'off' });
const innerValue = ref(props.modelValue || '');
const isFocus = ref(false);
const passwordVisible = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const formItemContext = inject(formItemContextKey);

const runValidation = (type: string) => {
  if (formItemContext && formItemContext.validate) {
    formItemContext.validate(type);
  }
};

async function keepFocus() {
  await nextTick();
  isFocus.value = true;
  if (inputRef.value) {
    inputRef.value.focus();
  }
}

const showClear = computed(()=> {
  return props.clearable &&
  !props.disabled &&
  isFocus.value &&
  !!innerValue.value;
})

const showPasswordArea = computed(() => {
  return props.showPassword &&
  !props.disabled && 
  !!innerValue.value;
})  

watch(() => props.modelValue, (v) => {
  if (v === undefined || v === null) {
    v = '';
  }
  innerValue.value = v;
})

const handleInput = () => {  
  runValidation('input');
  emits('update:modelValue', innerValue.value);
  emits('input', innerValue.value);
}

const handleFocus = () => {  
  isFocus.value = true;
  emits('focus', new FocusEvent('focus'));
  runValidation('focus');
}

const handleBlur = () => {
  isFocus.value = false;
  emits('blur', new FocusEvent('blur'));
  runValidation('blur');
}
const emits = defineEmits<InputEmits>();

const handleClear = () => {
  innerValue.value = '';
  emits('update:modelValue', '');  
  emits('clear');
  emits('input', '');
  emits('change', '');
};

const handleChange = () => {
  runValidation('change');
  emits('change', innerValue.value);
}

defineExpose({ ref: inputRef });
</script>