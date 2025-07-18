import { render, h, reactive } from "vue"
import type { CreateMessageProps, MessageContext } from "./types"
import MessageConstructor from './Message.vue'
import useZIndex from "@/hooks/useZIndex";
let seed = 1;
const instances = reactive<MessageContext[]>([]);
export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex();
  const id = `message_${seed++}`;
  const container = document.createElement('div');
  const onDestory = () => {
    const idx = instances.findIndex(instance => instance.id === id);
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container);
  }

  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id);
    if (instance) {
      instance.vm.exposed!.visible.value = false;
    }
  }

  const props2 = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory
  }

  const vNode = h(MessageConstructor, props2);
  render(vNode, container);
  document.body.appendChild(container.firstChild!);
  let vm = vNode.component!;
  const instance = {
    id,
    vnode: vNode,
    props: props2,
    bottom: 0,
    vm,
    destory: manualDestroy
  };
  instances.push(instance);
  return instance;
}

export const setBottom = (id: string, bottom: number) => {
  const idx = instances.findIndex(instance => id === instance.id);
  if (idx < 0) return;
  instances[idx].bottom = bottom;
}

export const getLastBottom = (id: string) => {
  const idx = instances.findIndex(instance => id === instance.id);
  if (idx <= 0) return 0;
  return instances[idx - 1].bottom || 0;
}
