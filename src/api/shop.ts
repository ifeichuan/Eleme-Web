import type { IShop, IList, IPaginate, IShopDetail } from "@/types";
import request from "./request";

export const fetchShopList = ({ _page, _limit }: IPaginate) => {
  console.log('fetchShopList', _page, _limit);
  return request.get<IList<IShop>, IList<IShop>>('/api/shop_list', {
    params: {
      _page,
      _limit
    }
  })
}

export const fetchShopPageData = (id: string) => {
  return request.get<IShopDetail, IShopDetail>('/api/shop_page', {
    params: {
      id
    }
  })
}
