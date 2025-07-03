<template>
  <div class="jx-message" :class="{
    [`jx-message--${type}`]: type,
    'is-close': showClose,    
    }" v-show="visible"
    ref="container"
    @mouseenter="clearTimer"
    @mouseleave="setTimer"
  :style="{top:top+'px',zIndex:zIndex}">
    <div class="jx-message__content">
      <slot><RenderVnode :vNode="message" v-if="message"></RenderVnode></slot>
    </div>
    <div class="jx-message__close" v-if="showClose">
      <Icon icon="times" @click="close"></Icon>
      <!-- {{id}} -->
    </div>
  </div>
</template>

<script setup lang="ts">

import { RenderVnode } from '@/components/Common/RenderVnode';
import type { MessageProps } from './types';
import Icon from '@/components/Icon/Icon.vue';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { getLastBottom, setBottom } from './method';
import useEventListtener from '@/hooks/useEventListener';

let timer: any;
const props = withDefaults(defineProps<MessageProps>(), { type: 'info', duration: 3000, offset: 20 });
const visible = ref(true);
const container = ref();
const top = computed(() => {
  return props.offset + getLastBottom(props.id)
});
watch(top, () => {
  setBottom(props.id, top.value + container.value.clientHeight);
}) 
const close = () => {  
  visible.value = false;
}

function keyDown(e: KeyboardEvent) {  
  if (e.code === 'Escape') {
    visible.value = false;
  }
}

useEventListtener(window, 'keydown', keyDown);

function clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function setTimer() {
  if (props.duration > 0) {
    timer = setTimeout(() => visible.value = false, props.duration);
  }  
}

onMounted(async() => {
  setTimer();
  await nextTick();
  setBottom(props.id, top.value + container.value.clientHeight);
  
})

watch(visible, () => {
  if (visible.value === false) props.onDestory();
})

defineExpose({
  visible
})
</script>