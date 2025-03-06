import type { IHomeInfo } from '@/types/index';

import request from './request';

export const fetchHomePageData = () => {
	return request.get<IHomeInfo>('/api/home_page');
};
