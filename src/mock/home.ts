import mockjs from 'mockjs';
import { getAssetsFile } from './utils';

const Mock = mockjs;

Mock.mock('/api/home_page', 'get', {
  code: 200,
  msg: 'success',
  data: {
    searchRecomments: [
      { value: 0, label: '牛腩' },
      { value: 1, label: '色拉' },
      { value: 2, label: '奶茶' },
      { value: 3, label: '西瓜汁' }
    ],
    banner:
    {
      imgUrl: getAssetsFile('index_page/transformer-banner.png')
    }
    ,
    transformer: [
      {
        label: '美食外卖',
        imgUrl: getAssetsFile('index_page/transformer-icon1.png')
      },
      {
        label: '超市便利',
        imgUrl: getAssetsFile('index_page/transformer-icon2.png')
      },
      {
        label: '美食团购',
        imgUrl: getAssetsFile('index_page/transformer-icon3.png')
      },
      {
        label: '丽人/医美',
        imgUrl: getAssetsFile('index_page/transformer-icon4.png')
      },
      {
        label: '休闲玩乐',
        imgUrl: getAssetsFile('index_page/transformer-icon5.png')
      },
      {
        label: '下午茶',
        imgUrl: getAssetsFile('index_page/transformer-icon6.png')
      },
      {
        label: '水果',
        imgUrl: getAssetsFile('index_page/transformer-icon7.png')
      },
      {
        label: '鲜花绿植',
        imgUrl: getAssetsFile('index_page/transformer-icon8.png')
      },
      {
        label: '买菜',
        imgUrl: getAssetsFile('index_page/transformer-icon9.png')
      },
      {
        label: '甜品饮品',
        imgUrl: getAssetsFile('index_page/transformer-icon10.png')
      },
      {
        label: '全城购',
        imgUrl: getAssetsFile('index_page/transformer-icon11.png')
      },
      {
        label: '送药上门',
        imgUrl: getAssetsFile('index_page/transformer-icon12.png')
      },
      {
        label: '0元领水果',
        imgUrl: getAssetsFile('index_page/transformer-icon13.png')
      },
      {
        label: '天天赚现金',
        imgUrl: getAssetsFile('index_page/transformer-icon14.png')
      },
      {
        label: '冲吧饿小宝',
        imgUrl: getAssetsFile('index_page/transformer-icon15.png')
      }
    ],
    scrollBarInfoList: [
      {
        type: 'bean',
        badge: '赚豆',
        detail: `今天再下<span class="info-num">1</span>单赚<span class="info-num">400</span>吃货豆`,
        btn: '领任务'
      },
      {
        type: 'hongbao',
        badge: '红包',
        detail: `你有<span class="info-num">4</span>张总<span class="info-num">43.5</span>元红包即将到期`,
        btn: '去查看'
      }
    ],
    countdown: {
      time: 24 * 60 * 60 * 1000,
      goods: {
        imgUrl: getAssetsFile('index_page/count-down-p.png'),
        name: '腊鸡腿菜饭 + 卤香干 + 冰红茶',
        price: 19.8,
        oldPrice: 28.9
      }
    },
    activities: [
      getAssetsFile('index_page/activity/01.png'),
      getAssetsFile('index_page/activity/02.png'),
      getAssetsFile('index_page/activity/03.png')
    ]
  }
});

export default Mock;
