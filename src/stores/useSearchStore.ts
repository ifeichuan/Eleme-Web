import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('useSearchStore', () => {
	const isShow = ref(false);
	const toggleShow = (val?: boolean) => {
		console.log(val);

		if (val === undefined) {
			isShow.value = !isShow.value;
		} else {
			// 用于Tabs路由切换时自动隐藏
			isShow.value = val;
		}
	};
	return {
		isShow,
		toggleShow,
	};
});
