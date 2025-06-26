<template>
    <Icon icon="arrow-up" :size="iconSize" :color="iconColor" spin />
    <Button circle type="info" @click="open2">circle</Button>
    <Button disabled type="danger">disabled</BUtton>
    <Button plain type="primary" @click="close2">plain</Button>
    <Button round type="success" size="small">round</Button>
    <Button autofocus type="warning" size="large">
      <div>
        autofocus
        <Icon icon="arrow-up" :size="iconSize" :color="iconColor" spin />
      </div>
    </Button>
    <Button native-type="button" ref="btn" @click="open" loading>open and output</Button>
    <Collapse v-model="openList" accordion>
      <CollapseItem name="a" title="a">content a</CollapseItem>
      <CollapseItem name="c" title="c">content c</CollapseItem>
      <CollapseItem name="b" title="b" disabled>content b</CollapseItem>
    </Collapse>
    <div>{{ openList }}</div>
    <Tooltip placement="bottom" trigger="hover" ref="tipRef" transition="fade" :openDelay="300" :closeDelay="300">
      <Alert>666</Alert>
      <template #content><img src="https://n.sinaimg.cn/sinacn20107/685/w594h891/20190427/2453-hvvuiyp2168424.jpg"/></template>
    </Tooltip>
    
    <Alert type="success" effect="light" :closable="false">666</Alert>
    <!-- <Alert type="success" effect="dark" >666</Alert>
    <Alert type="warning" effect="light" :closable="false">666</Alert>
    <Alert type="warning" effect="dark" >666</Alert>
    <Alert type="danger" effect="light" :closable="false">666</Alert>
    <Alert type="danger" effect="dark" >666</Alert>
    <Alert type="primary" effect="light" :closable="false">666</Alert>
    <Alert type="primary" effect="dark" >666</Alert> -->
    <Alert type="info" effect="light" :closable="false">666</Alert>
    <Alert ref="alert" type="info" effect="dark" @close="console.log('close')" @open="console.log('open')">666</Alert>
</template>

<script lang="ts" setup>
import Alert from './components/Alert/Alert.vue';
import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
import Icon from './components/Icon/Icon.vue';
import { ref } from 'vue';
import type { Options } from '@popperjs/core';

defineOptions({
  name:'APP'
});

let tipRef = ref();
let btn = ref();
let alert = ref();
let openList = ref(['a']);
let iconColor = ref<any>('green');
let iconSize = ref<any>('xl');
const options: Partial<Options> = { placement: 'top', strategy:'fixed' }
function open() {
  console.log(btn);
  alert.value.open();
}
function open2() {
  tipRef.value.show()
}
function close2() {
  tipRef.value.hide();
}
setTimeout(()=>{
  iconColor.value = 'gray'
  iconSize.value = '3x';
  },2000);
</script>

<style>

</style>
