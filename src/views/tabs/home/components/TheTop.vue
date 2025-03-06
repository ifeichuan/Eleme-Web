<script lang="ts" setup>
import type { recommentProps } from '@/types';

// import OpenSearch from '@/components/OpenSearch.vue';
const { recomments, address } = defineProps<recommentProps>();

interface IEmits {
	(e: 'click'): void;
}
const emits = defineEmits<IEmits>();
</script>

<template>
	<div class="home-top">
		<div class="top">
			<img class="location-icon" src="@/assets/imgs/index_page/location.png" />
			<div class="location">{{ address }} 幸福小区北门</div>
			<img src="@/assets/imgs/index_page/shopcart.png" class="shopcart-icon" />
			<img class="comments-icon" src="@/assets/imgs/index_page/comments.png" />
		</div>
		<VanSearch
			shape="round"
			background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
			readonly
			placeholder="塔斯汀 45-15"
			@click-input="emits('click')"
		>
			<template #right-icon>
				<div>搜索</div>
			</template>
		</VanSearch>
		<div class="search-recommend">
			<div class="tag" v-for="(obj, key) in recomments" :key="key">
				{{ obj.label }}
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.home-top {
	background: linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243));
	color: white;

	.top {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 10px 0 10px;
		line-height: 15px;
		font-size: 15px;
		font-weight: bold;

		.location-icon {
			width: 20px;
			height: 20px;
		}

		.location {
			flex: 1;
		}

		.shopcart-icon {
			width: 24px;
			height: 24px;
		}

		.comments-icon {
			width: 28px;
			height: 24px;
			margin-left: 10px;
		}
	}

	.search-recommend {
		display: flex;
		padding: 0 10px 8px;

		.tag {
			margin-right: 10px;
			border-radius: 10px;
			font-size: 12px;
			padding: 2px 8px;
			background-color: rgba(242, 242, 242, 0.3);
		}
	}
}
</style>
<style lang="scss">
.home-top {
	.van-field__right-icon {
		margin-right: 0;
	}
}
</style>
