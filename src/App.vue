<template>
    <Icon icon="arrow-up" :size="iconSize" :color="iconColor" spin />
    <Button circle type="info" @click="open2">circle</Button>
    <Button disabled type="danger">disabled</BUtton>
    <Button plain type="primary" @click="close2">plain</Button>
    <Tooltip content="66" placement="bottom" trigger="hover" ref="tipRef" transition="fade" :openDelay="300" :closeDelay="300">
      <Button round type="success" size="small">round</Button>
    </Tooltip>
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
    <!-- <Tooltip placement="bottom" trigger="hover" ref="tipRef" transition="fade" :openDelay="300" :closeDelay="300">
      <Alert>666</Alert>
      <template #content><img src="https://n.sinaimg.cn/sinacn20107/685/w594h891/20190427/2453-hvvuiyp2168424.jpg"/></template>
    </Tooltip> -->
    
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
    <Dropdown :menu-options="options" @select="select">
      1234
    </Dropdown>
    <Input v-model="text" :showPassword="true" clearable></Input>
    {{ text }}
</template>

<script lang="ts" setup>
import { createMessage } from './components/Message/method';
import Alert from './components/Alert/Alert.vue';
import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
import Icon from './components/Icon/Icon.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import { type MenuOption } from './components/Dropdown/types';
import { h, ref } from 'vue';
import Input from './components/Input/Input.vue';

defineOptions({
  name:'APP'
});

let tipRef = ref();
let btn = ref();
let alert = ref();
let openList = ref(['a']);
let iconColor = ref<any>('green');
let iconSize = ref<any>('xl');
let text = ref('')
const options:MenuOption[] =[
  {key:1, label: h('b','blod') },
  {key:2, label: 'item2', disabled: true},
  {key:3, label: 'item3', divided: true},
  {key:4, label: 'item4', }
]
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
  msg.destory();
  },2000);
const select = (e:MenuOption) => {
  console.log(e);
  
}

createMessage({message:'hello', duration:0, showClose:true,type:'success'})
const msg=createMessage({message:'hello', duration:0, showClose:true,type:'error'})
createMessage({message:'hello', duration:2000, showClose:true,type:'warning'})
</script>

<style>

</style>
