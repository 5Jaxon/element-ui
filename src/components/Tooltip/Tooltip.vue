<template>
  <div class="jx-tooltip" ref="containerNode" v-on="outEvents">
    <div class="jx-tooltip__trigger" v-on="events" ref="triggerNode">
      <slot/>
    </div>
    <Transition :name="transition">
      <div class="jx-tooltip__popper" ref="popperNode" v-if="active">
        <slot name="content">{{content}}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
    
  </div>
  
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import { type TooltipInstance, type TooltipEmits, type TooltipProps } from './types';
import { createPopper, type Instance } from '@popperjs/core';
import useClickOutside from './useClickOutside';
const props = withDefaults(defineProps<TooltipProps>(), { trigger: 'click', placement: 'bottom', openDelay: 0, closeDelay: 0});
const emit = defineEmits<TooltipEmits>();
const triggerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();
const containerNode = ref<HTMLElement>();
let popperInstance: Instance | null = null;
const active = ref(false);
const events = ref<Record<string, Function>>({});
const outEvents = ref<Record<string, Function>>({});

const popperOptions = computed(() => {
  return {
    placements: props.placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 9],
        },
      },
    ],
    ...props.popperOption
  }
})

let openTimeout:number | null = null;
const open = () => {
  if (openTimeout !== null) {
    clearTimeout(openTimeout);
    openTimeout = null;
  }
  if (closeTimeout !== null) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
  openTimeout = setTimeout(openDelay, props.openDelay);

}

const openDelay = () => {
  active.value = true;
  emit('visable-change', active.value);  
}

let closeTimeout:number | null = null;
const close = () => {
  if (openTimeout !== null) {
    clearTimeout(openTimeout);
    openTimeout = null;
  }
  if (closeTimeout !== null) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
  closeTimeout = setTimeout(closeDelay, props.closeDelay);

}

const closeDelay = () => {
  active.value = false;
  emit('visable-change', active.value);  
}

const attachevents = () => {
  events.value = {};
  outEvents.value = {};
  if (props.trigger === 'click') {
    events.value['click'] = () => {
      if (active.value) close();
      else open();
    }
  } else if (props.trigger === 'hover') {
    events.value['mouseenter'] = open;
    outEvents.value['mouseleave'] = close;
  }
}

watch(() => props.manual, (manual) => {
  if (!manual) {
    attachevents();
  } else {
    events.value = {};
    outEvents.value = {};
  }
})

if (!props.manual) attachevents();

useClickOutside(containerNode, () => {
  if (props.trigger === 'click' && active.value && !props.manual) {
    close();
    
  }
    
});

watch(() => props.trigger, attachevents);

watch(active, () => {
  if (active) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value);
    }
  } else {
    popperInstance?.destroy();
  }
}, { flush: 'post' });

defineExpose<TooltipInstance>({
  'show': open,
  'hide': close
})

onUnmounted(()=>{
  popperInstance?.destroy();
})
</script>