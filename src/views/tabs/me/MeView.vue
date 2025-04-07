<script lang="ts" setup>
import type { ISuperCard } from '@/types';
import { useAsync } from '@/hooks/useAsync';
import { fetchMePageData } from '@/api/Me';
import OpLoadingView from '@/components/OpLoadingView.vue';
import { useRouter } from 'vue-router';
import { defineComponent, watch } from 'vue';

// 为组件定义名称，以便KeepAlive能够正确识别
defineComponent({
	name: 'MeView',
});

const { data, pedding } = useAsync(fetchMePageData, {
	cards: [],
	superCard: {} as ISuperCard,
});
const router = useRouter();
const gotoLogin = () => {
	router.push({
		name: 'login',
	});
};
watch(pedding, () => {
	console.log({ pedding });
});
</script>

<template>
	<div class="me-page">
		<div class="me-page__top">
			<img src="/serverImgs/me_page/avatar.png" alt="" class="avatar" />
			<div class="name" @click="gotoLogin">请登陆</div>
			<div class="account op-thin-border" @click="gotoLogin">账号登陆</div>
		</div>
		<OpLoadingView :loading="pedding" type="loading">
			<div class="me-page__super-card">
				<div class="super-card__left">
					<div class="super-card__left__top">
						<img src="@/assets/imgs/me_page/super-card.png" alt="" class="card-img" />
						<div class="divider"></div>
						<div class="bean">吃货豆:</div>
						<div class="bean-count">{{ data.superCard.beanCount }}</div>
					</div>
					<div class="super-card__left__tips">{{ data.superCard.tips }}</div>
				</div>
				<van-icon name="arrow" size="14" color="rgb(212,189,178)" />
			</div>
			<div class="me-page__card" v-for="v in data.cards" :key="v.label">
				<div class="me-page__card__title">{{ v.label }}</div>
				<div class="me-page__card__items">
					<div class="me-page__card__item" v-for="item in v.items" :key="item.iconUrl">
						<VanIcon :name="item.iconUrl" :size="v.size"></VanIcon>
						<div class="label">
							{{ item.label }}<span v-if="item.count">{{ item.count }}</span>
						</div>
					</div>
				</div>
			</div>
		</OpLoadingView>
	</div>
</template>

<style lang="scss">
.me-page {
	background: var(--op-gray-bg-color);
	padding: 0 10px 75px 10px;

	&__top {
		padding: 10px;
		display: flex;
		align-items: center;
		background: rgb(244, 244, 244);
		.avatar {
			width: 32px;
			height: 32px;
			border-radius: 50%;
			margin-right: 10px;
		}
		.name {
			flex: 1;
			font-size: 15px;
			text-align: left;
		}
		.account {
			color: rgb(33, 179, 244);
			font-size: 8px;
			padding: 1px 10px;
			&:before {
				border-color: rgb(33, 179, 244);
				border-radius: 50px;
			}
		}
	}
	&__super-card {
		border-radius: 8px;
		background: rgb(42, 33, 46);
		color: rgb(253, 208, 159);
		display: flex;
		align-items: center;
		padding: 10px 10px 10px 20px;
		margin-bottom: 15px;
		.super-card__left {
			flex: 1;
			&__top {
				display: flex;
				align-items: center;
				.card-img {
					width: 81px;
					height: 23px;
				}
				.divider {
					position: relative;
					width: 1px;
					height: 20px;
					margin: 0 10px;
					&:before {
						content: '';
						position: absolute;
						top: -50%;
						left: 0;
						width: 200%;
						height: 200%;
						transform: scale(0.5);
						background: rgb(253, 208, 159);
					}
				}
				.bean {
					font-size: 12px;
					font-weight: bold;
					align-items: baseline;
				}
				.bean-count {
					font-weight: bold;
					font-size: 22px;
					line-height: 22px;
				}
			}
			&__tips {
				font-size: 12px;
				margin-top: 6px;
				color: rgb(212, 189, 178);
			}
		}
	}
	&__card {
		background: white;
		border-radius: 8px;
		padding: 10px;
		margin-bottom: 10px;

		&__title {
			font-weight: bold;
		}
		&__items {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
		}
		&__item {
			margin-top: 10px;
			text-align: center;
			.label {
				font-size: 12px;
				color: gray;
				margin-top: 5px;
			}
			.count {
				font-weight: bold;
				color: black;
			}
		}
	}
}
</style>
