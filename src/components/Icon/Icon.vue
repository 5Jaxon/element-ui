<template>
  <i class="jx-icon" :class="{[`jx-icon--${type}`]:type}" :style="iconColor" v-bind="$attrs">
    <font-awesome-icon v-bind="props"></font-awesome-icon>
  </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
defineOptions({
  name: 'JxIcon',
  inheritAttrs: false
});
const props = defineProps<IconProps>();

const iconColor = computed(() => props.color ? { color: props.color } : {} );
</script>