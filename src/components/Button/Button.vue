<template>
    <button class="jx-button" :class="{
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
import {defineProps} from 'vue';

withDefaults(defineProps<ButtonProps>(),{nativeType:'button'})

</script>

<style scoped>
@import './style.css'
</style>