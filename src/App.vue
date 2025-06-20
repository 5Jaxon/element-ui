<template>
    <Button circle type="info">circle</Button>
    <Button disabled type="danger">disabled</BUtton>
    <Button plain type="primary">plain</Button>
    <Button round type="success" size="small">round</Button>
    <Button autofocus type="warning" size="large">autofocus</Button>
    <Button native-type="button" ref="btn" @click="output">output</Button>
    <Collapse>
      <CollapseItem name="a" title="a">content a</CollapseItem>
      <CollapseItem name="b" title="b" disabled>content b</CollapseItem>
    </Collapse>
</template>

<script lang="ts" setup>
import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import { ref } from 'vue';
let btn = ref();
function output() {
  console.log(btn);
  
}
</script>

<script lang="ts">
export default {
    name:'APP'
}
</script>

<style>

</style>
