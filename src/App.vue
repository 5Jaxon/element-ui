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
    <Button native-type="button" ref="btn" @click="open" loading>open and output</Button>
    <Collapse v-model="openList" accordion>
      <CollapseItem name="a" title="a">content a</CollapseItem>
      <CollapseItem name="c" title="c">content c</CollapseItem>
      <CollapseItem name="b" title="b" disabled>content b</CollapseItem>
    </Collapse>
    <div>{{ openList }}</div>
    <Alert>666</Alert>
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
import Icon from './components/Icon/Icon.vue';
import { ref } from 'vue';
let btn = ref();
let alert = ref();
let openList = ref(['a']);
let iconColor = ref<any>('green');
let iconSize = ref<any>('xl');
function open() {
  console.log(btn);
  alert.value.open();
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
