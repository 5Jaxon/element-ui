<template>
  <div class="jx-switch" :class="{
    [`jx-switch--${size}`]: size,
    'is-disabled': disabled,
    'is-checked': checked,
  }">
    <input class="jx-switch__input"
    type="checkbox"           
    :name="name"
    :disabled="disabled"
    role="switch"
    @keydown.enter="handleClick"
    ref="inputRef">
    <div class="jx-switch__core" @click="handleClick">
      <div class="jx-switch__core-inner">
        <span v-if="activeText || inactiveText" class="jx-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="jx-switch__core-action"></div>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import { defineOptions, defineProps, defineEmits, ref, computed, watch, onMounted } from 'vue';
import type { SwitchEmits, SwitchProps } from './types';
defineOptions({
  name: 'JxSwitch',
  inheritAttrs: false,
});
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emit = defineEmits<SwitchEmits>();
const inputRef = ref<HTMLInputElement | null>(null);
const innerValue = ref(props.modelValue);
const checked = computed(() => {
  return innerValue.value === props.activeValue ;
});

watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue;
});

const handleClick = () => {
  if (props.disabled) return;
  const newValue = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newValue;
  emit('update:modelValue', innerValue.value);
  emit('change', innerValue.value);
};

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.checked = checked.value;
  }
});

watch(checked, (newValue) => {
  if (inputRef.value) {
    inputRef.value.checked = newValue;
  }
});
</script>