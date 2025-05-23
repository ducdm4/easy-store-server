import { IsNotEmpty, IsNumber } from 'class-validator';

class CommonIdDto {
  id: number;
}
export class PackagePurchasedDto {
  id: number;
  index: number;
  packagePurchasedGroupNumber: number;
}
export class PackagePurchasedUpdateDto {
  id: number;
  timeCanUseLeft: number;
}
export class ReceiptProduct {
  id: number;

  product: CommonIdDto;
  combo: CommonIdDto;
  package: {
    id: number;
    timesCanUse: number;
  };
  packagePurchased: PackagePurchasedDto;

  quantity: number;
  price: number;
  discounted: number;
  note: string;
  groupNumber: number;

  topping: {
    id: number;
    productId: number;
    product: CommonIdDto;
    quantity: number;
    price: number;
    discounted: number;
    isInCombo: boolean;
  }[];
}
export class CreateReceiptDto {
  code?: string;
  id?: number;
  subTotal: number | null;
  total: number | null;
  @IsNumber()
  type?: number;

  extraDiscount?: number | null;
  receiptProducts: ReceiptProduct[];
  customer?: {
    id?: number;
  };

  createdBy?: {
    id?: number;
  };
  note: string;
  deliveryAddress: string;
  deliveryName: string;
  deliveryPhone: string;
  totalItemDiscount: number;
  discounted: number;
  deliveryFee: number;

  @IsNotEmpty()
  @IsNumber()
  storeId: number;

  promoList: ReceiptPromoDto[];
}
export class ReceiptPromoDto {
  id?: number;
  code: {
    id: number;
    code: string;
  };
  campaign: {
    id: number;
  };
  campaignBonus: {
    id: number;
  };
  discountedAmount: number;
}
