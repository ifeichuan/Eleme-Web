/**
 * OpList 组件 - 通用列表加载组件
 *
 * 功能特点：
 * 1. 支持上拉加载更多和下拉加载更多
 * 2. 可自定义加载中和加载完成的提示文案
 * 3. 支持自定义加载状态的插槽
 * 4. 自动检测滚动位置并触发加载
 */

import { defineComponent, ref, onMounted, onUpdated, nextTick } from 'vue';
import { Loading as VanLoading } from 'vant';
import { createNamespace } from '@/utils/create';
import { useEventListener } from '@vant/use';
import { useRect } from '@/hooks/useRect';
import { useScrollParent } from '@/hooks/useScrollParent';
// import { useRect, useEventListener, useScrollParent } from '@vant/use';
import './OpList.scss';

const [name, bem] = createNamespace('list');

export default defineComponent({
	name,
	props: {
		// 触发加载的距离阈值（单位：px）
		offset: {
			type: Number,
			default: 300,
		},
		// 加载方向，可选值为 'up' 或 'down'
		direction: {
			type: String,
			default: 'down',
		},
		// 是否处于加载状态
		loading: {
			type: Boolean,
		},
		// 是否已加载完成
		finished: {
			type: Boolean,
		},
		// 加载完成后的提示文案
		finishedText: {
			type: String,
		},
		// 加载过程中的提示文案
		loadingText: {
			type: String,
		},
	},
	setup(props, { slots, emit }) {
		// 内部加载状态
		const loading = ref(props.loading);
		// 根元素引用
		const root = ref();
		// 占位元素引用
		const placeholder = ref();
		// 获取可滚动的父元素
		const scrollParent = useScrollParent(root);

		/**
		 * 检查是否需要触发加载
		 * 通过计算滚动容器与占位元素的位置关系来判断
		 */
		const check = () => {
			nextTick(() => {
				// 如果正在加载或已完成，则不触发加载
				if (loading.value || props.finished) {
					return;
				}

				const scrollParentEl = scrollParent.value;
				if (!scrollParentEl) return;

				// 获取滚动容器的位置信息
				const scrollParentRect = useRect(scrollParentEl);
				if (!scrollParentRect.height) {
					return;
				}
				// 获取占位元素的位置信息
				const palceholderRect = useRect(placeholder);
				const { offset, direction } = props;
				let isReachEdge = false;

				// 根据不同的加载方向计算是否达到触发条件
				if (direction === 'up') {
					isReachEdge = scrollParentRect.top - palceholderRect.top <= offset;
				} else {
					isReachEdge = palceholderRect.bottom - scrollParentRect.bottom <= offset;
				}

				// 达到触发条件时，更新状态并触发加载事件
				if (isReachEdge) {
					loading.value = true;
					emit('update:loading', true);
					emit('load');
				}
			});
		};

		/**
		 * 渲染加载状态
		 * 支持自定义加载状态的插槽
		 */
		const renderLoading = () => {
			if (loading.value && !props.finished) {
				return (
					<div class={bem('loading')}>
						{slots.loading ? (
							slots.loading()
						) : (
							<VanLoading class={bem('loading-icon')}>
								{props.loadingText || '加载中'}
							</VanLoading>
						)}
					</div>
				);
			}
		};

		/**
		 * 渲染加载完成的提示文案
		 * 支持自定义完成状态的插槽
		 */
		const renderFinishedText = () => {
			if (props.finished) {
				const text = slots.finished ? slots.finished() : props.finishedText;
				if (text) {
					return <div class={bem('finished-text')}>{text}</div>;
				}
			}
		};

		// 监听外部 loading 状态的变化
		onUpdated(() => {
			loading.value = props.loading;
		});

		// 组件挂载后进行首次检查
		onMounted(() => {
			check();
		});

		// 监听滚动事件
		useEventListener('scroll', check, {
			target: scrollParent,
			passive: true,
		});

		// 渲染组件
		return () => {
			const Content = slots.default?.();
			const Placeholder = <div ref={placeholder} class={bem('palceholder')}></div>;
			return (
				<div ref={root} class={bem()}>
					{props.direction === 'down' ? Content : Placeholder}
					{renderLoading()}
					{renderFinishedText()}
					{props.direction === 'up' ? Content : Placeholder}
				</div>
			);
		};
	},
});
