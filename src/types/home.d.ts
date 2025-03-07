export interface ISearchRecomment {
  label: string;
  value: number;
}

export interface recommentProps {
  recomments: ISearchRecomment[];
  address: string;
}
export interface ISerachResult {
  type: string;
  label: string;
  resultCount: number;
}

export interface IHomeInfo {
  banner: Ibanner;
  searchRecomments: ISearchRecomment[];
  transformer: ITransFormer[];
  countDown: ICountDown;
  activities: string[];
}

export interface Ibanner {
  imgUrl: string
}

export interface ITransformer {
  imgUrl: string;
  label: string;
}
export interface ICountDown {
  timer: number;
  goods: IGoods;
}

export interface IGoods {
  imgUrl: string;
}
