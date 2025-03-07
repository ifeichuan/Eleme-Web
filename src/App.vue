<script setup lang="ts">
import { RouterView } from 'vue-router';

// import { onMounted } from 'vue';
// import request from './api/request';
// onMounted(async () => {
// 	const data = await request.get('/api/user');
//   console.log(data);
// });
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
