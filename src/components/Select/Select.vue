<template>
  <div class="jx-select"
  :class="{'is-disabled': disabled}"
  @click="handleClick">
  <Tooltip manual ref="tooltipRef" :popperOption="popperOptions" @click-outside="dropdownShow(false)">
    <Input v-model="state.label" :disable="disabled"
    :placeholder="filteredPlaceholder" :readonly="!filterable && !remote" ref="inputRef"
    @mouseenter="hover = true" @input="onInput"
    @mouseleave="hover = false" @keydown.stop="handleKeydown">
      <template #suffix>
        <Icon v-if="clearable && state.value && hover" icon="close"  @click.stop="clear"/>
        <Icon v-else icon="angle-down" class="header-angle" :class="{ 'is-active': visible}"/>
      </template>
    </Input>
    <template #content>
      <div class="jx-select__loading" v-if="state.loading">
        <Icon icon="spinner" spin></Icon>
      </div>
      <div class="jx-select__nodata" v-else-if="(filterable || remote) && filteredOptions.length === 0">无匹配项</div>
      <ul class="jx-select__menu" >
        <template v-for="(item, index) in filteredOptions" :key="index">
          <li class="jx-select__menu-item"
            :class="{
              'is-disabled': item.disabled, 
              'is-highlighted': state.highlightedIndex === index,
              'is-selected': item.value === state.value
            }"
            :id="`select-item-${index}`"
            @click.stop="selectItem(item)">
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
import Icon from '../Icon/Icon.vue';
import type { SelectEmits, SelectOption, SelectProps, SelectState } from './types';
import { computed, reactive, ref, watch } from 'vue';
import { drop, isFunction } from 'lodash-es';

defineOptions({
  name: 'JxSelect',
});


const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null);
const inputRef = ref<InstanceType<typeof Input> | null>(null);
const visible = ref(false);
const hover = ref(false);
let timeout: any = null;
const props = withDefaults(defineProps<SelectProps>(), { options: () => [] });
const emit = defineEmits<SelectEmits>();
const state = reactive<SelectState>({
  label: findLabelByValue(props.modelValue || ''),
  value: props.modelValue || '',
  selected: props.options.find(option => option.value === (props.modelValue || '')) || null,
  highlightedIndex: -1,
});

const popperOptions: any = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    },
  ],
};

const filteredOptions = ref(props.options);

watch(() => props.options, (newOptions) => {
  filteredOptions.value = newOptions;  
});

const generateFilteredOptions = async (searchValue: string) => {
  if (!props.filterable && !props.remote) return;
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue);
  } else if (props.remote && isFunction(props.remoteMethod)) {
    state.loading = true;
    try {
      filteredOptions.value = await props.remoteMethod(searchValue);
    } catch (e) {
      console.error('Error in remote method:', e);
      filteredOptions.value = [];
    } finally {
      state.loading = false;
    }
  } else {
    const lowerCaseSearch = searchValue.toLowerCase();
    filteredOptions.value = props.options.filter(option => 
      option.label.toLowerCase().includes(lowerCaseSearch)
    );
  } 
};

function onInput(value: string) {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    onFilter(value);
  }, 300);
}

function onFilter(value: string) {
  if (value === '') {
    filteredOptions.value = props.options;
  } else {
    generateFilteredOptions(value);
  }
}

const filteredPlaceholder = computed(() => {
  return (props.filterable && state.selected && visible.value)
  ? state.selected.label : props.placeholder || '请选择';
}) 

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
    if (props.filterable && state.label) {
      state.label = '';
    }
    if (props.filterable) onFilter(state.label);
    tooltipRef.value?.show();
  } else {
    state.highlightedIndex = -1;
    tooltipRef.value?.hide();
    if (props.filterable || props.remote) {
      state.label = state.selected !== null ? state.selected.label : '';
    }
  }
  visible.value = show;
  emit('visibleChange', show);
}

function findLabelByValue(value: string): string {
  const option = props.options.find(item => item.value === value);
  return option ? option.label : '';
}

watch(() => props.modelValue, (newValue: string | undefined) => {
  if (newValue === undefined || newValue === state.value) {
    return
  }
  state.value = newValue;
  state.label = findLabelByValue(newValue);
});

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        if (state.highlightedIndex < filteredOptions.value.length - 1) {
          state.highlightedIndex++;
        } else {
          state.highlightedIndex = 0;
        }
      }
      break;
    case 'ArrowUp':
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        if (state.highlightedIndex > 0) {
          state.highlightedIndex--;
        } else {
          state.highlightedIndex = filteredOptions.value.length - 1;
        }
      }
      break;
    case 'Enter':
    e.preventDefault();
      if (!visible.value) {        
        dropdownShow(true);
      } else if (filteredOptions.value[state.highlightedIndex]) {        
        selectItem(filteredOptions.value[state.highlightedIndex]);
        dropdownShow(false);
      }
      
      break;
    case 'Escape':
      e.preventDefault();
      dropdownShow(false);
      break;
    default:
      break;
  }
};

function selectItem(item: SelectOption) {
  if (item.disabled) return;
  inputRef.value?.ref?.focus();
  state.label = item.label;
  state.value = item.value;
  state.selected = item;
  dropdownShow(false);  
  emit('change', item.value);
  emit('update:modelValue', item.value);
}

function clear() {
  state.label = '';
  state.value = '';
  state.selected = null;
  dropdownShow(false);
  emit('clear');
  emit('update:modelValue', '');
  emit('change', '');
}
</script>