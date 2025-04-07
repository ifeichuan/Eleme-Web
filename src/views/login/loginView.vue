<script lang="ts" setup>
import { ref } from 'vue';
import router from '@/router';
import type { ILoginInfo } from '@/types';
// import { useAuth } from '@/hooks/useAuth';
const username = ref('');
const password = ref('');

const onClickLeft = () => {
	router.back();
};

// const { login } = useAuth();

const onSubmit = async (data: ILoginInfo) => {
	// await login(data);
	onClickLeft();
};
</script>

<template>
	<div class="login-page op-fullscreen h-screen w-screen bg-gray-100">
		<VanNavBar title="请登陆" left-text="返回" left-arrow @click-left="onClickLeft" />
		<VanForm class="login-page__form p-4" @submit="onSubmit">
			<VanCellGroup inset>
				<VanField
					v-model="username"
					name="username"
					label="用户名"
					placeholder="请输入用户名"
					:rules="[
						{
							required: true,
							message: '请输入用户名',
						},
					]"
				/>
				<VanField
					v-model="password"
					name="password"
					label="密码"
					placeholder="请输入密码"
					:rules="[
						{
							required: true,
							message: '请输入密码',
						},
					]"
				/>
			</VanCellGroup>
			<div class="m-4">
				<VanButton class="" round block type="primary" native-type="submit">提交</VanButton>
			</div>
		</VanForm>
	</div>
</template>

<style lang="scss" scoped>
.login-page {
	.login-page__form {
		margin-top: 100px;
		display: flex;
		justify-content: space-between;
	}
}
</style>
