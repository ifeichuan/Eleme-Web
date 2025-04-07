<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { preLoading } from './router';
// import { onMounted } from 'vue';
// import request from './api/request';
// onMounted(async () => {
// 	const data = await request.get('/api/user');
//   console.log(data);
// });
const width = ref();
onMounted(() => {
	width.value = document.body.clientWidth;
	import('@/views/tabs/tabsView.vue')
		.then((res) => {
			console.log('加载成功');
		})
		.catch((rej) => {
			console.log('加载失败');
		});
});
</script>

<template>
	<RouterView></RouterView>
</template>

<style>
#app {
	/* 字体抗锯齿 可以让字体更清晰 */
	-webkit-font-smoothing: antialiased;
	-moz-font-smoothing: grayscale;
}
</style>
