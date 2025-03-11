<template>
	<div>
		<VanSwipe autoplay="3000" :show-indicators="false" class="swipe-view" loop>
			<VanSwipeItem v-for="(item, key) in data" :key="key">
				<img :src="item" alt="Banner " />
			</VanSwipeItem>
		</VanSwipe>
	</div>
</template>

<script setup lang="ts">
interface IProps {
	data: string[];
}
const { data } = defineProps<IProps>();
console.log(data);
</script>

<style scoped lang="scss">
.swipe-view {
	width: 180px;
	height: 170px;
	border-radius: 8px;
}
</style>
