<script lang="ts" setup>
import type { ICountDown } from '@/types';
import { useCountDown } from '@/hooks/useCountDown';
interface IProps {
	data: ICountDown;
}
// 难点 精确计时
const { data } = defineProps<IProps>();

const countDown = useCountDown({
	time: data.time,
});
const { current } = countDown;
countDown.start();

const padStart = (num: number) => {
	// 填充字符串前导0 padStart
	// 填充后缀padEnd
	return num.toString().padStart(2, '0');
};
</script>

<template>
	<div class="home-countdown">
		<div class="info">
			<img class="logo" src="@/assets/imgs/index_page/count-down.png" alt="" />
			<span class="number">{{ padStart(current.hours) }}</span>
			<span class="colon">:</span>
			<span class="number">{{ padStart(current.minutes) }}</span>
			<span class="colon">:</span>
			<span class="number">{{ padStart(current.seconds) }}</span>
			<span class="colon">:</span>
		</div>
		<div class="goods">
			<img class="img" :src="data.goods.imgUrl" alt="" />
			<div class="name op-ellipsis">{{ data.goods.name }}</div>
			<div class="price">
				<span class="now"
					>$<span>{{ data.goods.price }}</span></span
				>
				<span class="old"
					>$<span>{{ data.goods.oldPrice }}</span></span
				>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.home-countdown {
	border-radius: 8px;
	width: 180px;
	height: 170px;
	background: linear-gradient(to bottom, rgb(252, 202, 202), white, white, white);
	padding: 15px 10px;
	box-sizing: border-box;
	justify-content: flex-end;
	.info {
		display: flex;
		align-items: center;
		.logo {
			width: 80px;
			margin-right: 8px;
		}
		.number {
			font-size: 12px;
			background: rgb(252, 78, 78);
			color: white;
			padding: 2px;
			border-radius: 2px;
			width: 16px;
			font-weight: bold;
		}
		.colon {
			margin: 0 1px;
			color: red;
		}
	}

	.goods {
		margin-top: 8px;
		.img {
			width: 160px;
			height: 74px;
			margin-bottom: 4px;
		}
		.price {
			align-items: baseline;
			font-size: 12px;
			.now {
				color: red;
				margin-right: 4px;
				span {
					font-weight: bold;
					font-size: 16px;
				}
				.old {
					text-decoration: line-through;
				}
			}
		}
	}
}
</style>
