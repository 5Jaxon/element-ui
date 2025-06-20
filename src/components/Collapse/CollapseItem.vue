<template>
  <div class="jx-collapse-item"
  :class="{
    'is-disabled': disabled
  }">
    <div class="jx-collapse-item__header" :id="`item-header-${name}`" @click="handleClick">
      <slot name="title">{{ title }}</slot>      
    </div>
    <div class="jx-collapse-item__content" :id="`item-content-${name}`" v-show="isActive">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { type CollapseItemProps, CollapseContextKey} from './types';
defineOptions({ 
  name:'JxCollapseItem'
})
const props = defineProps<CollapseItemProps>();
const collapseContext = inject(CollapseContextKey);
const isActive = computed(()=>{
  return collapseContext?.activeNames.value.includes(props.name);
});
const handleClick = () => {
  if (props.disabled)return;
  collapseContext?.handleItemClick(props.name);
}
</script>

<style>
.jx-collapse-item__header {
  font-size: 50px;
}
</style>

