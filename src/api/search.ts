import { type ISerachResult } from '@/types';
import request from './request';

export function fetchSearchData(key: string = '') {
  return request.get<ISerachResult>('/api/home_search', {
    params: {
      _label_like: key,
    },
  });
}
