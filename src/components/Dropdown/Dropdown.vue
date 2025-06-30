<template>
  <div class="jx-dropdown">
    <Tooltip
    :trigger="trigger"
    :placement="placement"
    :popper-option="popperOption"
    :open-delay="openDelay"
    @visable-change="visableChage"
    ref="tooltipRef">
      <slot></slot>
      <template #content>
        <ul class="jx-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided"
            role="separator"
            class="divided-placeholder"/>
            <li class="jx-dropdown__item"
            :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
            :id="`dropdown-item-${item.key}`"
            @click="itemClick(item)">
              <RenderVnode :v-node="item.label"/>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>

  </div>
</template>

<script setup lang="ts">
import type { DropdownEmits, DropdownInstance, DropdownProps, MenuOption } from './types';
import Tooltip from '../Tooltip/Tooltip.vue';
import { ref, type Ref } from 'vue';
import { type TooltipInstance } from '../Tooltip/types';
import { RenderVnode } from '../Common/RenderVnode';
const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true});
const emit = defineEmits<DropdownEmits>();
const tooltipRef = ref() as Ref<TooltipInstance>;

const visableChage = (active: boolean) => {
  emit('visable-change', active);
}

const itemClick = (menuItem: MenuOption) => {
  if (menuItem.disabled) return;
  emit('select', menuItem);
  if (props.hideAfterClick) {
    tooltipRef.value.hide();
  }
}

defineExpose<DropdownInstance>({ 'show':tooltipRef.value?.show, 'hide':tooltipRef.value?.hide })
</script>