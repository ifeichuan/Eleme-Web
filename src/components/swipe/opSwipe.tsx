import { createNamespace } from '@/utils/create';
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';

const [name, bem] = createNamespace('swipe');
export const SWIPE_KEY = Symbol(name);

export type SwipeState = {
	rect: {
		width: number;
		height: number;
	} | null;
	width: number;
	height: number;
	offset: number;
	active: number;
	swiping: boolean;
};

export default defineComponent({
	name: name,
	props: {
		autoplay: {
			type: Number,
			default: 0,
		},
		duration: {
			type: Number,
			default: 500,
		},
		loop: {
			type: Boolean,
			default: true,
		},
		showIndicators: {
			type: Boolean,
			default: true,
		},
		vertical: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { slots }) {
		const root = ref();
		const track = ref();
		const state = reactive<SwipeState>({
			rect: {
				width: 0,
				height: 0,
			},
			offset: 0,
			width: 0,
			height: 0,
			active: 0,
			swiping: false,
		});
		const { children, linkChildren } = useChildren(SWIPE_KEY);
		const count = computed(() => {
			return children.length;
		});
		const size = computed(() => {
			return state[props.vertical ? 'height' : 'width'];
		});
		const trackSize = computed(() => {
			return count.value * size.value;
		});
		const trackStyle = computed(() => {
			const mainAxis = props.vertical ? 'height' : 'width';
			const style = {
				transitionDuration: `${state.swiping}?0:${props.vertical}`,
				transform: `transform${props.vertical ? 'Y' : 'X'}(${state.offset}px)`,
				[mainAxis]: `${trackSize.value}`,
			};
			return style;
		});
		let timeout: number;

		const next = () => {
			correctPosition();
			doubleRaf(() => {
				state.swiping = false;
				move();
			});
		};

		const stopAutoPlay = () => {
			clearTimeout(timeout);
		};
		const autoplay = () => {
			stopAutoPlay();
			if (props.autoPlay > 0 && count.value > 1) {
				timeout = setTimeout(() => {
					next();
					autoplay();
				}, props.autoplay);
			}
		};

		const init = () => {
			if (!root.value) {
				return;
			}
			const rect = {
				width: root.value?.offsetWidth,
				height: root.value?.offsetHeight,
			};
			state.rect = rect;
			state.width = rect.width;
			state.height = rect.height;
			autoplay();
		};
		onMounted(init);
		return () => (
			<div ref={root} class={bem()}>
				<div ref={track} class={bem('track')} style={trackStyle.value}>
					{slots.default?.()}
				</div>
			</div>
		);
	},
});
