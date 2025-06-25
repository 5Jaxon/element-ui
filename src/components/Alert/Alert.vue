<template>
  <Transition name="fade">
    <div v-if="active" class="jx-alert" :class="{
      [`jx-alert--${type}`]: type,
      [`jx-alert--${effect}`]: effect,      
      }">
      <slot>{{ content }}</slot>
      <Icon icon="times" v-if="closable" @click="close()"></Icon>    
    </div>
  </Transition>  
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AlertEmit, Instance, type AlertProps } from './types';
import Icon from '../Icon/Icon.vue';

defineOptions({
  name:"JxAlert"
});

withDefaults(defineProps<AlertProps>(), { closable: true });

const emit = defineEmits<AlertEmit>();
const active = ref(true);

const open = () => {
  active.value = true;
  emit('open');
}

const close = () => {
  active.value = false;
  emit('close');
}

defineExpose<Instance>({ open, close});

</script>