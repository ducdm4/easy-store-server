export const ROLE_LIST = {
  ADMIN: 1,
  STORE_OWNER: 2,
  STORE_SALE: 3,
};

export interface KeyValue {
  [key: string]: any;
}

export enum SPACE_UNIT_STATUS {
  DE_ACTIVE,
  AVAILABLE,
  BOOKED,
  OCCUPIED,
  MERGED,
} // 0: de-active, 1: available, 2: booked, 3: occupied, 4: merged

export enum PRODUCT_TYPE {
  PRODUCT,
  TOPPING,
}

export enum PRODUCT_COMMISSION_TYPE {
  PERCENT,
  MONEY,
}
