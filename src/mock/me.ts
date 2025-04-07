import mockjs from 'mockjs';
const Mock = mockjs;

Mock.mock('/api/me_page', () => {
  return {
    code: 200,
    data: {
      superCard: {
        beanCount: 1555,
        tips: "下单得5倍吃货豆,兑专享红包",
      },
      cards: [
        {
          label: "常用功能",
          size: 30,
          items: [
            {
              iconUrl: "/serverImgs/me_page/coupang.png",
              label: "红包卡券",
              count: 25,
            },
            {
              iconUrl: "/serverImgs/me_page/like.png",
              label: "店铺关注",
              count: 5,
            },
            {
              iconUrl: "/serverImgs/me_page/serve.png",
              label: "客服",
              count: 0,
            },
            {
              iconUrl: "/serverImgs/me_page/location.png",
              label: "地址",
              count: 0,
            },
          ],
        },
        {
          label: "互动玩乐",
          size: 30,
          items: [
            {
              iconUrl: "/serverImgs/me_page/bean.png",
              label: "赚吃货豆",
              count: 0,
            },
            {
              iconUrl: "/serverImgs/me_page/cash.png",
              label: "现金提款机",
              count: 0,
            },
            {
              iconUrl: "/serverImgs/me_page/redbag.png",
              label: "天天赚现金",
              count: 0,
            },
            {
              iconUrl: "/serverImgs/me_page/exiaobao.png",
              label: "冲吧饿小宝",
              count: 0,
            },
          ],
        },
        {
          label: "更多推荐",
          size: 20,
          items: [
            {
              iconUrl: "location-o",
              label: "我的地址",
              count: 0,
            },
            {
              iconUrl: "service-o",
              label: "我的客服",
              count: 0,
            },
            {
              iconUrl: "gold-coin-o",
              label: "签到领现金",
              count: 0,
            },
            {
              iconUrl: "hotel-o",
              label: "企业订餐",
              count: 0,
            },
            {
              iconUrl: "label-o",
              label: "发票助手",
              count: 0,
            },
            {
              iconUrl: "award-o",
              label: "0元抽手机",
              count: 0,
            },
            {
              iconUrl: "balance-o",
              label: "瓜分吃货豆",
              count: 0,
            },
            {
              iconUrl: "smile-comment-o",
              label: "冲吧饿小宝",
              count: 0,
            },
            {
              iconUrl: "coupon-o",
              label: "省钱好券",
              count: 0,
            },
            {
              iconUrl: "diamond-o",
              label: "品牌会员",
              count: 0,
            },
            {
              iconUrl: "smile-comment-o",
              label: "冲吧饿小宝",
              count: 0,
            },
            {
              iconUrl: "coupon-o",
              label: "省钱好券",
              count: 0,
            },
            {
              iconUrl: "diamond-o",
              label: "品牌会员",
              count: 0,
            },
          ],
        },
      ],
    }
  }
})
