<template>
    <Icon icon="arrow-up" :size="iconSize" :color="iconColor" spin />
    <Button circle type="info">circle</Button>
    <Button disabled type="danger">disabled</BUtton>
    <Button plain type="primary">plain</Button>
    <Button round type="success" size="small">round</Button>
    <Button autofocus type="warning" size="large">
      <div>
        autofocus
        <Icon icon="arrow-up" :size="iconSize" :color="iconColor" spin />
      </div>
    </Button>
    <Button native-type="button" ref="btn" @click="output" loading>output</Button>
    <Collapse v-model="openList" accordion>
      <CollapseItem name="a" title="a">content a</CollapseItem>
      <CollapseItem name="c" title="c">content c</CollapseItem>
      <CollapseItem name="b" title="b" disabled>content b</CollapseItem>
    </Collapse>
    <div>{{ openList }}</div>
</template>

<script lang="ts" setup>
import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import { ref } from 'vue';
let btn = ref();
let openList = ref(['a']);
let iconColor = ref<any>('green');
let iconSize = ref<any>('xl');
function output() {
  console.log(btn);
  
}
setTimeout(()=>{
  iconColor.value = 'gray'
  iconSize.value = '3x';
  },2000);
</script>

<script lang="ts">
export default {
    name:'APP'
}
</script>

<style>

</style>
