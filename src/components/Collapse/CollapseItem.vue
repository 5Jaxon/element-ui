<template>
  <div class="jx-collapse-item"
  :class="{
    'is-disabled': disabled
  }">
    <div class="jx-collapse-item__header" 
    :class="{
      'is-active': isActive,
      'is-disabled': disabled
    }"
    :id="`item-header-${name}`"
    @click="handleClick">
      <slot name="title">{{ title }}</slot>          
        <Icon icon="angle-right" class="header-angle" />      
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="jx-collapse-item__wrapped" v-show="isActive">
        <div class="jx-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { type CollapseItemProps, CollapseContextKey} from './types';
import Icon from '../Icon/Icon.vue';
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
const transitionEvents: Record<string, (el:HTMLElement) => void > = {
  beforeEnter(el) {
    el.style.height = '0px';
    el.style.overflow = 'hidden';
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`;
  },
  afterEnter(el) {
    el.style.height = '';
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },
  leave(el) {
    el.style.height = '0px';
  },
  afterLeave(el) {
    el.style.height = '';
  }
}

</script>