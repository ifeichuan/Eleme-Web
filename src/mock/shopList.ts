import mockjs from 'mockjs';

const Mock = mockjs;

// 商店项目数据生成函数
const getItemData = (index: number) => ({
  id: index,
  postUrl: `/serverimgs/index_page/shop-list/post1.png`,
  shopName: `切果NOW!布鲁斯-${index}`,
  branch: "XXX店",
  score: 4.7,
  monthlyCount: 7020,
  deliveryTime: "30分钟",
  deliveryDistance: "849m",
  deliveryStratingPrice: "￥20.0",
  deliveryStrategy: "满0.01配送￥0", // 免配送费
  deliveryTags: ["蓝骑士专送"],
  comments: ["红柚红心火龙果凤梨约600g三拼"],
  tops: ["XX区水果热销第2名"],
  activitys: [
    {
      // 满减
      type: 2,
      infos: ["49减3", "59减6", "79减8", "99减18"],
    },
    {
      // 特价
      type: 3,
      tips: "特价4选1",
    },
  ],
  services: [
    {
      tpye: 1,
      label: "坏品包退",
    },
    {
      tpye: 2,
      label: "极速退款",
    },
    {
      tpye: 3,
      label: "果蔬商超红包",
    },
    {
      tpye: 4,
      label: "支持预订",
    },
    {
      tpye: 5,
      label: "开发票",
    },
  ],
});

// 生成固定的商店列表数据
const generateShopList = () => {
  const TOTAL = 50;
  const result = [];
  for (let i = 0; i < TOTAL; i++) {
    result.push(getItemData(i));
  }
  return result;
};

// 创建商店列表数据
const shopListData = generateShopList();

// 设置 mock 接口，支持分页
Mock.mock(/\/api\/shop_list(\?.*)?$/, 'get', (options) => {
  // 解析请求参数
  const url = options.url;
  const params = new URLSearchParams(url.split('?')[1] || '');

  // 获取分页参数，默认为第1页，每页10条
  const page = parseInt(params.get('_page') || '1', 10);
  const limit = parseInt(params.get('_limit') || '10', 10);

  // 计算分页位置
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // 获取分页数据
  const paginatedData = shopListData.slice(startIndex, endIndex);

  return {
    code: 200,  // 修改为0表示成功
    message: 'success',
    data: {
      data: {
        list: paginatedData,  // 将数据放在 list 字段中
        total: shopListData.length,
        pageSize: limit,
        pageNum: page,
        totalPage: Math.ceil(shopListData.length / limit)
      }
    }
  };
});

export default Mock;
