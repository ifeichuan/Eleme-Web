import { ref, } from 'vue';
import { defineStore } from 'pinia';


export const useSearchViewToggle = defineStore('SearchViewToggle', () => {
	const isSearchShow = ref(false);
	function toggleSearchShow(val?: boolean) {
		if (val != null) {
			isSearchShow.value = val;
		} else isSearchShow.value = !isSearchShow.value;
	}
	return { isSearchShow, toggleSearchShow };
});
