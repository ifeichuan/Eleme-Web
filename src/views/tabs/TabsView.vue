<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

import { ref, watch } from 'vue';
import { useSearchStore } from '@/stores/search';
const searchView = useSearchStore();
const moveWay = ref(1); // 1表示向右滑动，-1表示向左滑动
const route = useRoute();
const router = useRouter();
const active = ref(route.name as string);

watch(active, (newval, oldval) => {
	// 计算滑动方向，基于路由名称的导航逻辑
	searchView.toggleShow(false);
	let a = newval.length;
	let b = oldval.length;
	// home和order之间的导航需要特殊处理
	if ((newval == 'home' && oldval == 'order') || (oldval == 'home' && newval == 'order')) {
		const t = a;
		a = b;
		b = t;
	}

	// 设置滑动方向: 1表示向右, -1表示向左
	moveWay.value = a > b ? 1 : -1;
	// active.value = newval;
	// 导航到新路由
	router.push({ name: newval });
});
</script>

<template>
	<div style="display: contents">
		<div class="router-view-container">
			<RouterView v-slot="{ Component }">
				<transition :name="moveWay === 1 ? 'slide-right' : 'slide-left'" mode="out-in">
					<KeepAlive include="HomeView,OrderView,MeView">
						<component :is="Component" />
					</KeepAlive>
				</transition>
			</RouterView>
		</div>

		<VanTabbar v-model="active">
			<VanTabbarItem name="home" icon="home-o">首页</VanTabbarItem>
			<VanTabbarItem name="order" icon="bars">订单</VanTabbarItem>
			<VanTabbarItem name="me" icon="contact">我的</VanTabbarItem>
		</VanTabbar>
	</div>
</template>

<style>
.center {
	text-align: center;
}

.router-view-container {
	position: relative;
	overflow: hidden;
	min-height: calc(100vh - 50px); /* 减去Tabbar的高度 */
	width: 100%;
	left: 0;
	right: 0;
	background-color: rgb(244, 244, 244);
}

/* 动画容器样式 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
	transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
	position: absolute;
	width: 100%;
	overflow: hidden;
	top: 0;
	left: 0;
	right: 0;
}

/* 确保两个页面在切换过程中不会重叠错位 */
.slide-left-enter-active,
.slide-right-enter-active {
	z-index: 10;
}

.slide-left-leave-active,
.slide-right-leave-active {
	z-index: 0;
}

/* 向左滑动的入场动画 */
.slide-left-enter-from {
	transform: translateX(100%);
	opacity: 0;
}
.slide-left-enter-to {
	transform: translateX(0);
	opacity: 1;
}

/* 向左滑动的出场动画 */
.slide-left-leave-from {
	transform: translateX(0);
	opacity: 1;
}
.slide-left-leave-to {
	transform: translateX(-100%);
	opacity: 1;
}

/* 向右滑动的入场动画 */
.slide-right-enter-from {
	transform: translateX(-100%);
	opacity: 0;
}
.slide-right-enter-to {
	transform: translateX(0);
	opacity: 1;
}

/* 向右滑动的出场动画 */
.slide-right-leave-from {
	transform: translateX(0);
	opacity: 1;
}
.slide-right-leave-to {
	transform: translateX(100%);
	opacity: 1;
}
</style>
