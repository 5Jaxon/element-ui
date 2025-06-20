<template>
  <div class="jx-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { NameType, CollapseEmits, CollapseProps } from './types';
import { CollapseContextKey } from './types';
import { provide, ref, watch } from 'vue';
defineOptions({
  name:'JxCollapse'
});
const props = defineProps<CollapseProps>();
const emit = defineEmits<CollapseEmits>();
const activeNames = ref<NameType[]>(props.modelValue || []);
const handleItemClick = (item:NameType) => {
  if (props.accordion) {
    if (activeNames.value[0] === item) {
      activeNames.value = [];
    }else {
      activeNames.value = [item];
    }
  } else {
    const index = activeNames.value.indexOf(item);
    if (index > -1) {
      activeNames.value.splice(index, 1);
    } else {
      activeNames.value.push(item);
    }
  }

  emit('change', activeNames.value);
  emit('update:modelValue', activeNames.value);
}

watch(() => props.modelValue, ()=>{
  if (props.modelValue) activeNames.value = props.modelValue;
});

provide(CollapseContextKey, {activeNames, handleItemClick});
</script>