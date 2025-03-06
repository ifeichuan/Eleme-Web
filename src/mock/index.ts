import mockjs from 'mockjs';
const Mock = mockjs;
Mock.setup({
	timeout: '3000',
});
Mock.mock('/api/user', 'get', {
	msg: 'random',
	code: '200',
	data: {
		name: '@cname',
		age: '@integer',
		phone: Mock.Random.image('500x200', 'red', 'Mock.js'),
	},
});
Mock.Random.extend({
	// 保留原有的扩展方法
	shopName: function () {
		const prefix = ['老王', '阿里', '小杨', '川味', '粤式', '沪上', '北京'];
		const suffix = ['快餐店', '餐饮店', '小吃店', '料理店', '面馆', '炒饭店', '便当'];
		return this.pick(prefix) + this.pick(suffix);
	},
	foodTag: function () {
		return this.pick([
			'川菜',
			'粤菜',
			'江浙菜',
			'火锅',
			'小吃',
			'快餐',
			'面食',
			'烧烤',
			'日料',
			'韩餐',
		]);
	},
	dishName: function () {
		return this.pick([
			'麻婆豆腐',
			'宫保鸡丁',
			'回锅肉',
			'水煮鱼',
			'红烧肉',
			'糖醋里脊',
			'炸酱面',
			'担担面',
			'小笼包',
			'叉烧',
		]);
	},
	// 新增服务器图片方法
	serverImage: function (path) {
		return `/src/assets/serverImgs/${path}`;
	},
});

Mock.mock(/\/api\/home_search(\?.*)?$/, 'get', (options) => {
	const url = new URL(options.url, 'http://localhost');
	const searchKey = url.searchParams.get('_label_like') || '';

	// 生成10-15个随机搜索结果
	const count = Mock.Random.integer(10, 15);
	const results = Array.from({ length: count }, () => {
		const type = Mock.Random.pick(['dish', 'restaurant', 'tag', 'activity']);
		let label = '';

		switch (type) {
			case 'dish':
				label = Mock.Random.dishName();
				break;
			case 'restaurant':
				label = Mock.Random.shopName();
				break;
			case 'tag':
				label = Mock.Random.foodTag();
				break;
			case 'activity':
				label = Mock.Random.pick(['满减优惠', '新店特惠', '下单立减', '优惠券']);
				break;
		}

		// 如果有搜索关键词，将其添加到结果中
		if (searchKey) {
			label = `${label}${searchKey}`;
		}

		return {
			type,
			label,
			resultCount: Mock.Random.integer(1, 50),
		};
	});

	return {
		code: 200,
		msg: 'success',
		data: results,
	};
});
Mock.mock('/api/home_page', 'get', {
	code: 200,
	msg: 'success',
	data: {
		searchRecomments: [
			{ value: 0, label: '牛腩' },
			{ value: 1, label: '色拉' },
			{ value: 2, label: '奶茶' },
			{ value: 3, label: '西瓜汁' },
		],
		banner: {
			imgUrl: Mock.Random.serverImage('index_page/transformer-banner.png'),
		},

		transformer: [
			{
				label: '美食外卖',
				imgUrl: Mock.Random.serverImage('index_page/transformer-icon1.png'),
			},
			{
				label: '超市便利',
				imgUrl: Mock.Random.serverImage('index_page/transformer-icon2.png'),
			},
			{
				label: '美食团购',
				imgUrl: Mock.Random.image('60x60', '#A8E6CF', '团购'),
			},
			{
				label: '丽人/医美',
				imgUrl: Mock.Random.image('60x60', '#FFB7B2', '医美'),
			},
			{
				label: '休闲玩乐',
				imgUrl: Mock.Random.image('60x60', '#FFB7B2', '玩乐'),
			},
			{
				label: '下午茶',
				imgUrl: Mock.Random.image('60x60', '#A8E6CF', '下午茶'),
			},
			{
				label: '水果',
				imgUrl: Mock.Random.image('60x60', '#95DEE3', '水果'),
			},
			{
				label: '鲜花绿植',
				imgUrl: Mock.Random.image('60x60', '#F5D69F', '鲜花'),
			},
			{
				label: '买菜',
				imgUrl: Mock.Random.image('60x60', '#FFB7B2', '买菜'),
			},
			{
				label: '甜品饮品',
				imgUrl: Mock.Random.image('60x60', '#A8E6CF', '甜品'),
			},
		],
		scrollBarInfoList: [
			{
				type: 'bean',
				badge: '赚豆',
				detail: `今天再下<span class="info-num">1</span>单赚<span class="info-num">400</span>吃货豆`,
				btn: '领任务',
			},
			{
				type: 'hongbao',
				badge: '红包',
				detail: `你有<span class="info-num">4</span>张总<span class="info-num">43.5</span>元红包即将到期`,
				btn: '去查看',
			},
		],
		countdown: {
			time: 24 * 60 * 60 * 1000,
			goods: {
				imgUrl: Mock.Random.serverImage('index_page/count-down-p.png'),
				name: '腊鸡腿菜饭 + 卤香干 + 冰红茶',
				price: 19.8,
				oldPrice: 28.9,
			},
		},
		activities: [
			Mock.Random.serverImage('index_page/activity/01.png'),
			Mock.Random.serverImage('index_page/activity/02.png'),
			Mock.Random.serverImage('index_page/activity/03.png'),
		],
	},
});

console.log('mock server is running', Mock.Random.cname());
export default Mock;
