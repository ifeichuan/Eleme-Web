import { onUnmounted } from "vue";

export function useTimeout(fn: () => void, delay: number = 1000) {
  const timer = setTimeout(() => {
    fn();
  }, delay)
  const clear = () => {
    clearTimeout(timer)
  }
  onUnmounted(clear)
  return clear
}
