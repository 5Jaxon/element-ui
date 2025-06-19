<template>
    <button ref="_ref" class="jx-button" :class="{
            [`jx-button--${size}`]:size,
            [`jx-button--${type}`]:type,
            'is-plain':plain,
            'is-round':round,
            'is-circle':circle,
            'is-disabled':disable,
        }" :disable="disable" :type="nativeType" :autofocus="autofocus">
        <span><slot/></span>
        </button>
</template>

<script lang="ts">
export default {
    name:'JxButton'
}
</script>

<script lang="ts" setup>
import {type ButtonProps} from './types';
import {defineProps,ref,defineExpose} from 'vue';

let _ref=ref<HTMLButtonElement>();
withDefaults(defineProps<ButtonProps>(),{nativeType:'button'})
defineExpose({ref:_ref});
</script>

<style scoped>
@import './style.css'
</style>