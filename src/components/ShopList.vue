<script lang="ts" setup>
import { ref } from 'vue';
import type { IShop } from '@/types';
import { fetchShopList } from '@/api/shop';
import OpList from './list/OpList';
const shopList = ref([] as IShop[]);
const loading = ref(false);
const finished = ref(false);
let page = 1;
const onLoad = async () => {
	if (finished.value) return;
	const { data, total } = await fetchShopList({
		_page: page++,
		_limit: 5,
	});
	console.log(data);

	// console.log(data);
	shopList.value.push(...data);
	console.log(shopList.value);
	loading.value = false;
	if (shopList.value.length >= total) {
		finished.value = true;
	}
};
console.log('Shoplist Mouted');
</script>

<template>
	<div class="home-shop-list">
		<OpList
			v-model:loading="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<KeepAlive>
				<ShopItem v-for="v in shopList" :key="v.id" :data="v" />
			</KeepAlive>
		</OpList>
	</div>
</template>

<style lang="scss" scoped>
.home-shop-list {
	padding: 8px 10px;
}
</style>
