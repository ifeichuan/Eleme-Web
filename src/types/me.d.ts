export interface IMeInfo {
  cards: ICard[]
  superCard: ISuperCard
}

export interface ICard {
  label: string,
  size: number,
  items: IItem[]
}

export interface ISuperCard {
  // 欢乐豆
  beanCount: number
  tips: string
}

export interface IItem {
  count: number
  iconUrl: string
  label: string
}
