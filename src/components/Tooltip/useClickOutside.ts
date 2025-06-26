import { onMounted, onUnmounted, type Ref } from "vue";
const useClickOutside = (elementRef: Ref<HTMLElement | undefined>, callback: Function) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(e.target as HTMLElement)) {
      callback(e);
    }
  }
  onMounted(() => document.addEventListener('click', handler));
  onUnmounted(() => document.removeEventListener('click', handler));
}

export default useClickOutside;