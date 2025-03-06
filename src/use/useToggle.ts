import { ref } from 'vue';
import type { Ref } from 'vue';
export function useToggle(initState: boolean): [Ref<boolean>, () => void] {
	const state = ref(initState);
	const toggle = () => {
		state.value = !state.value;
	};
	return [state, toggle];
}
