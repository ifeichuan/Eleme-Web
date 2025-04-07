<script lang="ts" setup>
import { onMounted } from 'vue';

interface IProps {
	loading: boolean;
	type: 'loading' | 'skeleton';
}
const { loading, type } = defineProps<IProps>();
onMounted(() => {
	console.log(type);
});
</script>

<template>
	<div v-if="loading" class="op-loading-view">
		<slot name="template">
			<div class="loading-wrapper" v-if="type === 'loading'">
				<VanLoading />
			</div>
			<div class="skeleton-wrapper" v-if="type === 'skeleton'">
				<VanLoading></VanLoading>
				<VanSkeleton title avatar :row="10" />
				<VanSkeleton title :row="10" avatar />
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
