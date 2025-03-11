<script lang="ts" setup>
import TheTop from './components/TheTop.vue';
import OpLoadingView from '@/components/OpLoadingView.vue';
import SearchView from '../search/SearchView.vue';
import TheTransformer from './components/TheTransformer.vue';
import ScrollBar from '@/components/ScrollBar.vue';
import SwipeView from '@/components/SwipeView.vue';
import { fetchHomePageData } from '@/api/Home';
import CountDown from '@/components/CountDown.vue';
import { useAsync } from '@/hooks/useAsync';
import { useSearchStore } from '@/stores/search';
import type { ICountDown, IHomeInfo } from '@/types';
import Mock from '@/mock/index';
import { PRIMARY_COLOR, TRANSPARENT } from '@/config';
import { HOME_TABS } from './config';
import { ref, onActivated, onDeactivated } from 'vue';
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
const { data, pedding } = useAsync(fetchHomePageData, {
	banner: [],
	searchRecomments: [],
	transformer: [],
	scrollBarInfoList: [],
	countDown: {} as ICountDown,
	activities: [],
} as IHomeInfo);

const tabBackgroundColor = ref(TRANSPARENT);

const onTabScroll = ({ isFixed }: { isFixed: boolean }) => {
	tabBackgroundColor.value = isFixed ? 'white' : TRANSPARENT;
};

// 添加滚动位置记忆
const scrollPosition = ref(0);

// 修改搜索视图显示逻辑
const showSearch = () => {
	// 保存当前滚动位置
	scrollPosition.value = window.scrollY;
	// 打开搜索视图
	searchView.toggleShow(true);
};

const hideSearch = () => {
	// 关闭搜索视图
	searchView.toggleShow(false);
	// 恢复滚动位置
	setTimeout(() => {
		window.scrollTo(0, scrollPosition.value);
	}, 100);
};
</script>

<template>
	<div class="home-page">
		<Transition name="fade" appear>
			<SearchView v-if="searchView.isShow" @cancel="hideSearch" />
		</Transition>

		<TheTop :recomments="recomments" :address="address" @click="showSearch" />

		<OpLoadingView :loading="pedding" type="skeleton">
			<!-- <template #template> loading </template> -->
			<div class="">
				<div class="home-page__banner">
					<img :src="data?.banner[0].imgUrl" alt="Banner " />
				</div>

				<TheTransformer :data="data.transformer" />
				<ScrollBar :data="data.scrollBarInfoList" />
				<div class="flex justify-between items-center m-2">
					<CountDown :data="data.countDown" />
					<SwipeView :data="data.activities" />
				</div>
				<VanTabs
					sticky
					offset-top="54px"
					:color="PRIMARY_COLOR"
					:background="tabBackgroundColor"
					@scroll="onTabScroll"
				>
					<VanTab v-for="(v, key) in HOME_TABS" :key="key" :title="v.title">
						<component :is="v.component"></component>
					</VanTab>
				</VanTabs>
			</div>
		</OpLoadingView>
	</div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.home-page {
	background: rgb(244, 244, 244);
}
.home-page__banner {
	padding-top: 0.625rem;
}
</style>
