<script lang="ts" setup>
import { defineComponent } from 'vue';

// 为组件定义名称，以便KeepAlive能够正确识别
defineComponent({
  name: 'OrderView'
});
</script>

<template>
	<div>
		<div class="center">订单</div>
	</div>
</template>

<style>
.test {
	font-size: 39px;
}
</style>
