import { onUnmounted } from "vue";

export function useInterval(fn: () => void, delay: number = 1000) {
  const timer = setInterval(() => {
    fn();
  }, delay)
  const clear = () => {
    clearInterval(timer)
  }
  onUnmounted(clear)
  return clear
}
