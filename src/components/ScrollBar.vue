<script lang="ts" setup>
import { type IScrollBarInfo } from '@/types';
import { onMounted, useTemplateRef } from 'vue';
// import { useTimeout } from '@/hooks/useTimeout';
import { useInterval } from '@/hooks/useInterval';
interface IProps {
	intervalTime?: number;
	transitionTime?: number;
	height?: number;
	data: IScrollBarInfo[];
}
// withDefaults 用于设置Props默认值
const props = withDefaults(defineProps<IProps>(), {
	intervalTime: 3000,
	transitionTime: 1000,
	height: 40,
});

const heightPx = `${props.height}px`;
console.log(heightPx);
const containerRef = useTemplateRef('containerRef');
onMounted(() => {
	const container: HTMLDivElement = containerRef.value as HTMLDivElement;
	const count = container?.children.length;
	const firstSwipeItem: HTMLDivElement = container.children[0] as HTMLDivElement;
	(container as HTMLElement).style.height = `${count * props.height}px`;
	// 记录元素到第几个
	let index = 0;
	useInterval(() => {
		index++;
		// 如果超过item个数就需要将第一个元素接到后面
		if (index >= count) {
			firstSwipeItem.style.transform = `translateY(${index * props.height}px)`;
			// firstSwipeItem.animate({
			// 	transform: `translateY(${index * props.height})px`,
			// });
			// 第一个元素滚动动画结束之后,将整个container位置重置
			const timer = setTimeout(() => {
				// firstSwipeItem.animate({
				// 	transform: ``,
				// });
				// container.animate(
				// 	{
				// 		transform: ``,
				// 	},
				// 	{},
				// );
				firstSwipeItem.style.transform = '';
				container.style.transform = '';
				container.style.transition = '';
				clearTimeout(timer);
			}, props.transitionTime);
		}
		// @Todo 修改为WebAnimationApi
		// container.animate([{ transform: `translateY(-${index * props.height}px)` }], {
		// 	duration: props.transitionTime,
		// 	easing: 'linear',
		// 	fill: 'forwards',
		// });
		// 好吧修改不了
		container.style.transform = `translateY(-${index * props.height}px)`;
		container.style.transition = `all linear ${props.transitionTime}ms`;
		index = index % count;
	}, props.intervalTime);
});
</script>

<template>
	<div class="home-scroll-bar">
		<div class="home-scroll-bar__swipe">
			<div ref="containerRef">
				<div class="swipe-item" v-for="item in props.data" :key="item.type">
					<div class="scroll-bar__info" :class="`scroll-bar__info__${item.type}`">
						<span class="info-badge">{{ item.badge }}</span>
						<span class="info-detail" v-html="item.detail"></span>
						<!-- 细线 -->
						<span class="info-btn op-thin-border">{{ item.btn }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.home-scroll-bar {
	--bean-color: rgb(252, 164, 40);
	--hongbao-color: rgb(252, 68, 25);
	&__swipe {
		background-color: white;
		border-radius: 8px;
		margin: 5px 10px;
		font-size: 13px;
		position: relative;
		overflow: hidden;
		height: v-bind(heightPx);
		.swipe-item {
			height: v-bind(heightPx);
		}
	}
	.scroll-bar__info {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 10px;
		height: 100%;

		.info-badge {
			border-radius: 5px;
			padding: 2px 6px;
			color: white;
			margin-right: 6px;
			font-size: 12px;
		}
		.info-detail {
			flex: 1;
		}
		.info-btn {
			padding: 3px 14px;
			font-size: 12px;
			&.op-thin-border::before {
				border-radius: 50px;
			}
		}
		.info-num {
			font-weight: bold;
			margin: 0 2px;
		}
		&__bean {
			.info-badge {
				background: var(--bean-color);
			}
			.info-btn {
				color: var(--bean-color);
				&::before {
					border-color: var(--bean-color);
				}
			}
			.info-num {
				color: var(--bean-color);
			}
		}
		&__hongbao {
			.info-badge {
				background: var(--hongbao-color);
			}
			.info-btn {
				color: var(--hongbao-color);
				&::before {
					border-color: var(--hongbao-color);
				}
			}
			.info-num {
				color: var(--hongbao-color);
			}
		}
	}
}
</style>
