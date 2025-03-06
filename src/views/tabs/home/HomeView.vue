<script lang="ts" setup>
import TheTop from './components/TheTop.vue';
import { useToggle } from '@/use/useToggle';
import { useAsync } from '@/use/useAsync';
import SearchView from '../search/SearchView.vue';
import Mock from '@/mock/index';
import { fetchHomePageData } from '@/api/Home';
import type { IHomeInfo } from '@/types';
import { useSearchStore } from '@/stores/useSearchStore';
const searchView = useSearchStore();
const recomments = [
	{
		value: 1,
		label: '牛腩',
	},
	{
		value: 2,
		label: '色拉',
	},
];
const address = Mock.Random.county();
// const [isSearchViewshow, toggleSearchView] = useToggle(false);

const { data, pedding } = useAsync(fetchHomePageData, {} as IHomeInfo);
</script>

<template>
	<div class="home-page">
		<SearchView v-if="searchView.isShow" @cancel="searchView.toggleShow" />
		<TheTop :recomments="recomments" :address="address" @click="searchView.toggleShow" />
		{{ pedding }}
		{{ data }}
		<div class="loading" v-if="pedding == false">
			<VanSkeleton title :row="3" :loading="pedding" />
		</div>
		<template v-if="data?.banner">
			<img :src="data.banner.imgUrl" alt="" />
		</template>
	</div>
</template>

<style></style>
