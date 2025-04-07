import mockjs from "mockjs";
const Mock = mockjs

Mock.mock(/\/api\/shop_page(\?.*)?$/, (options) => {
  console.log(options)
  return {

    code: 200,
    data: {
      id: 1,
      postUrl: "/imgs/index_page/shop-list/post1.png",
      shopName: "切果NOW！切果NOW！",
      branch: "XXX店",
      score: 4.7,
      monthlyCount: 7020,
      deliveryTime: "约30分钟",
      deliveryDistance: "849m",
      deliveryStratingPrice: "￥20.0",
      deliveryStrategy: "满0.01配送￥0", // 免配送费
      deliveryTags: ["蓝骑士专送"],
      comments: ["“红柚红心火龙果凤梨约600g三拼”"],
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
      redbags: [
        {
          // 新客红包
          type: 1,
          count: 6,
          if: "新客",
        },
        {
          // 满减
          type: 2,
          count: 15,
          if: "满79可用",
        },
      ],
      discounts: [
        {
          // 满减
          type: 1,
          label: "满减",
          content: [
            {
              count: 3,
              if: 49,
            },
            {
              count: 6,
              if: 59,
            },
            {
              count: 8,
              if: 79,
            },
            {
              count: 10,
              if: 99,
            },
          ],
        },
        {
          // 配送
          type: 2,
          label: "配送",
          content: [
            {
              count: 5,
              if: 0.01,
              limit: "当日每人限3单优惠",
            },
          ],
        },
        {
          // 特价
          type: 3,
          label: "特价",
          content: [
            {
              count: 0.01,
            },
          ],
        },
        {
          // 任选
          type: 4,
          label: "任选",
          content: [
            {
              label: "部分商品3件27.9元",
            },
          ],
        },
      ],
      announcement:
        "欢迎光临切果NOW！作为果切行业的全国连锁品牌，成立四年来，我们遍布全国80个大中城市的近500家门店，已累计为超千万的用户提供了新鲜、好吃、卫生、便捷的果切服务！",
    }
  };
})
