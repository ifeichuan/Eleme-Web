<script lang="ts" setup>
import { fetchShopPageData } from '@/api/shop';
import OpLoadingView from '@/components/OpLoadingView.vue';
import { useAsync } from '@/hooks/useAsync';
import { useRoute } from 'vue-router';
import ShopHeader from './components/ShopHeader.vue';
const route = useRoute();
const { id } = route.params;
const { data, pedding } = useAsync(() => fetchShopPageData(id as string), {
	announcement: '',
	discounts: [],
	redbags: [],
	activitys: [],
	branch: '',
	comments: [],
	deliveryDistance: '',
	deliveryStrategy: '',
	deliveryStratingPrice: '',
	deliveryTags: [],
	deliveryTime: '',
	id: '',
	monthlyCount: 0,
	postUrl: '',
	bgUrl: '',
	score: 0,
	services: [],
	shopName: '',
	tops: [],
});

const onClickLeft = () => history.back();
</script>

<template>
	<div class="container">
		<div>正在开发中</div>
		<VanNavBar left-text="返回" left-arrow @click-left="onClickLeft"></VanNavBar>
		<OpLoadingView :loading="pedding" type="skeleton">
			<ShopHeader :data="data" />
		</OpLoadingView>
	</div>
</template>

<style></style>
