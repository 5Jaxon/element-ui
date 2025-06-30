<template>
  <div class="jx-message" :class="{
    [`jx-message--${type}`]: type,
    'is-close': showClose,    
  }">
    <div class="jx-message__content">
      <slot><RenderVnode :vNode="message" v-if="message"></RenderVnode></slot>
    </div>
    <div class="jx-message__close" v-if="showClose">
      <Icon icon="time"></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">

import { RenderVnode } from '@/components/Common/RenderVnode';
import type { MessageProps } from './types';
import Icon from '@/components/Icon/Icon.vue';
import { onMounted, ref } from 'vue';

const props = withDefaults(defineProps<MessageProps>(), { type: 'info', duration: 3000 });
const visable = ref(false);
onMounted(() => {

})
</script>