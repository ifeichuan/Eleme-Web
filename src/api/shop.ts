import type { IShop, IList, IPaginate } from "@/types";
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
