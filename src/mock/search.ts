import mockjs from 'mockjs';
const Mock = mockjs;

Mock.Random.extend({
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

export default Mock;
