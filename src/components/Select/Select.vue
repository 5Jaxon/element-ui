<template>
  <div class="jx-select"
  :class="{'is-disabled': disabled}"
  @click="handleClick">
  <Tooltip placement="bottom-start" manual ref="tooltipRef">
    <Input v-model="innerValue" :disable="disabled" :placeholder="placeholder" />
    <template #content>
      <ul class="jx-select__menu">
        <template v-for="(item, index) in options" :key="index">
          <li class="jx-select__menu-item"
            :class="{'is-disabled': item.disabled}"
            :id="`select-item-${index}`">
            {{ item.label }}
          </li>
        </template>
      </ul>
    </template>
  </Tooltip>
  </div>
</template>

<script setup lang="ts">
import Tooltip from '../Tooltip/Tooltip.vue';
import Input from '../Input/Input.vue';
import type { SelectEmits, SelectOption, SelectProps } from './types';
import { ref } from 'vue';

defineOptions({
  name: 'JxSelect',
});

const innerValue = ref('');
const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null);
const visible = ref(false);
const props = defineProps<SelectProps>();
const emit = defineEmits<SelectEmits>();

function handleClick() {
  if (props.disabled) return;  
  if (visible.value) {
    dropdownShow(false);
  } else {
    dropdownShow(true);
  }
}

function dropdownShow(show: boolean) {
  if (show) {
    tooltipRef.value?.show();
  } else {
    tooltipRef.value?.hide();
  }
  visible.value = show;
  emit('visibleChange', show);
}

</script>