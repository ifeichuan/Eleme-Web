import type { IHomeInfo } from '@/types/index';

import request from './request';

export const fetchHomePageData = () => {
  // 我去这里这个坑导致我找了两天的报错 哭！
  return request.get<IHomeInfo, IHomeInfo>('/api/home_page');
};
