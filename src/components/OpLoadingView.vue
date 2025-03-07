<script lang="ts" setup>
interface IProps {
	loading: boolean;
	type: 'loading' | 'skeleton';
}
defineProps<IProps>();
</script>

<template>
	<div v-if="loading" class="op-loading-view">
		<slot name="template">
			<div class="loading-wrapper" v-if="type === 'loading'">
				<VanLoading />
			</div>
			<div class="skeleton-wrapper" v-if="type === 'skeleton'">
				<van-skeleton :row="10" />
				<van-skeleton title :row="10" avatar />
				<VanSkeleton title row="5" />
			</div>
		</slot>
	</div>
	<slot v-else></slot>
</template>

<style lang="scss" scoped>
.op-loading-view {
	.loading-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
	}
	.skeleton-wrapper {
		padding: 20px 10px;
	}
}
</style>
