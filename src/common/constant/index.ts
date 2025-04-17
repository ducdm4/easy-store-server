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

export enum TRANSACTIONS_TYPE {
  IMPORT,
  EXPORT,
}

export enum PRODUCT_TYPE {
  PRODUCT,
  TOPPING,
}

export enum PRODUCT_COMMISSION_TYPE {
  PERCENT,
  MONEY,
}

export enum PROMO_TYPE {
  PRODUCT,
  COMBO,
  PACKAGE,
  WHOLE_RECEIPT,
  BONUS,
}

export enum PROMO_CODE_STATUS {
  NOT_STARTED,
  OCCUPIED,
  PAUSED,
  ENDED,
  OUT_OF_STOCK,
}

export enum PROMO_CAMPAIGN_STATUS {
  NOT_STARTED,
  OCCUPIED,
  PAUSED,
  ENDED,
}

export enum RECEIPT_STATUS {
  TEMPORARY_SAVE,
  COMPLETED,
  CANCELLED_FROM_TEMPORARY_SAVE,
  CANCELLED_FROM_COMPLETED,
}

export enum RECEIPT_TYPE {
  TAKE_AWAY,
  DINE_IN,
  DELIVERY,
}
