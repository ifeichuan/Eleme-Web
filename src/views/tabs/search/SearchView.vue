<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchSearchData } from '@/api/search';
interface IEmits {
	(e: 'cancel'): void;
}
const emits = defineEmits<IEmits>();
const searchValue = ref('');
const searchResult = ref();
const isSearch = ref(false);
const searchHistory = computed(() => {
	return JSON.parse(localStorage.getItem('searchHistory') as string);
});

const handleSearch = async (v: string) => {
	clearResult();
	try {
		const json: string[] = JSON.parse(localStorage.getItem('searchHistory') as string);
		if (json.includes(v) && json[0] !== v) {
			delete json[json.findIndex((item) => item === v)];
			json.unshift(v);
		} else if (!v || v.trim() === '') {
		} else {
			json.unshift(v);
		}
		localStorage.setItem('searchHistory', JSON.stringify(json));
		isSearch.value = true;
		const list = await fetchSearchData(v);
		searchResult.value = list;
		// searchHistory.value = JSON.parse(localStorage.getItem('searchHistory') as string);
	} finally {
		isSearch.value = false;
	}
};

const searchRef = ref();
const inputSearch = useDebounce(searchValue, 300);
watch(inputSearch, (nv) => {
	// if (!nv) {
	clearResult();
	// return;
	// }
	handleSearch(nv);
});
// 输入自动搜索 防抖
const clearResult = () => {
	searchResult.value = [];
};
const handleTagClick = (v: string) => {
	// console.log(e.target.innerText);
	searchValue.value = v;
	handleSearch(v);
};
onMounted(() => {
	// 确保组件挂载后自动聚焦
	if (localStorage.getItem('searchHistory') == null) {
		localStorage.setItem('searchHistory', JSON.stringify(['测试']));
	}
	setTimeout(() => {
		searchRef.value?.focus();
	}, 100);
});
</script>

<template>
	<!-- <Teleport to="#app"> -->
	<!-- <Transition name="fade" appear> -->
	<div class="search-view w-screen h-screen">
		<VanSearch
			ref="searchRef"
			autofocus
			show-action
			v-model="searchValue"
			shape="round"
			placeholder="请输入搜索关键词"
			@search="handleSearch"
			@cancel="emits('cancel')"
			@update:model-value="clearResult"
		></VanSearch>
		<div class="result mt-3">
			<div class="searching" v-if="isSearch">搜索中</div>
			<div class="resultShow" v-if="searchResult && searchValue">
				<div
					class="item flex justify-between text-2 bg-blue-200 rounded-xl items-center m-2 p-1.5"
					v-for="(item, key) in searchResult"
					:key="key"
				>
					<div class="left flex items-center justify-center">
						<VanIcon name="search" />
						<div class="name ml-1">
							{{ (item.label as string).split(searchValue)[0] }}
							<span class="">{{ searchValue }}</span>
						</div>
					</div>
					<div class="count mr-3">约{{ item.resultCount }}个结果</div>
				</div>
			</div>
			<div class="resultEmpty" v-else-if="searchValue && !searchResult">搜索结果为空</div>
			<div class="searchValueEmpty h-18 overflow-hidden" v-else>
				<div
					class="History flex overflow-hidden justify-start items-start flex-wrap basis-1/2"
					v-if="searchHistory"
				>
					<TransitionGroup name="list">
						<div
							@click="handleTagClick(item)"
							class="item rounded-xl bg-gray-100 p-1 m-1"
							v-for="(item, index) in searchHistory"
							:key="index"
						>
							{{ item }}
						</div>
					</TransitionGroup>
				</div>
				<div class="" v-else>还没有搜索记录呢</div>
			</div>
		</div>
	</div>
	<!-- </Transition> -->
	<!-- </Teleport> -->
</template>

<style lang="scss">
.search-view {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background-color: white;
	z-index: 999;
}
.list-enter-active,
.list-leave-active {
	transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
</style>
