// function debounce<T>(fn: IDebounce<T>, delay: number) {
// 	let timer: number | null = null;
// 	return function f(this: void, ...args: T[]) {
// 		if (timer) {
// 			clearTimeout(timer);
// 		}
// 		timer = setTimeout(() => {
// 			fn.call(this, ...args);
// 		}, delay);
// 	};
// }
import { onUnmounted, ref, watch, type Ref, type UnwrapRef } from 'vue';
export function useDebounce<T>(value: Ref<T>, delay: number) {
	const debounceValue = ref(value.value);
	let timer: number | null = null;
	const unWatch = watch(value, (newval) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			debounceValue.value = newval as UnwrapRef<T>;
		}, delay);
	});
	onUnmounted(() => {
		unWatch();
	});
	return debounceValue;
}
