<script lang="ts" setup>
import TheTop from './components/TheTop.vue';
import OpLoadingView from '@/components/OpLoadingView.vue';
import SearchView from '../search/SearchView.vue';
import TheTransformer from './components/TheTransformer.vue';
import { fetchHomePageData } from '@/api/Home';
import { useAsync } from '@/use/useAsync';
import { useSearchStore } from '@/stores/search';
import { type AxiosResponse } from 'axios';
import type { IHomeInfo } from '@/types';
import Mock from '@/mock/index';

// 模拟一个热门搜索
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
// 更换了Pinia全局store用于Tabs切换时自动隐藏
// const [isSearchViewshow, toggleSearchView] = useToggle(false);
const searchView = useSearchStore();
const { data, pedding } = useAsync(fetchHomePageData, {} as AxiosResponse<IHomeInfo>);
</script>

<template>
	<div class="home-page">
		<Transition name="fade" appear>
			<SearchView v-if="searchView.isShow" @cancel="searchView.toggleShow" />
		</Transition>
		<TheTop :recomments="recomments" :address="address" @click="searchView.toggleShow" />

		<OpLoadingView :loading="pedding" type="skeleton">
			<!-- <template #template> loading </template> -->
			<div class="">
				<div class="home-page__banner">
					<img :src="data?.banner?.imgUrl" alt="Banner " />
				</div>

				<TheTransformer :data="data?.transformer" />
			</div>
		</OpLoadingView>
	</div>
</template>

<style scoped lang="scss">
.fade-erter-active,
.fade-leave-active {
	transition: opacity 1s ease;
}
.fade-erter-from,
.fade-leave-to {
	opacity: 0;
}
.home-page {
	background: rbg(244, 244, 244);
}
.home-page__banner {
	padding-top: 0.625rem;
}
</style>
