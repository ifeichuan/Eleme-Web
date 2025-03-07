<script lang="ts" setup>
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
</script>

<template>
	<div class="home-scroll-bar"></div>
</template>

<style></style>
