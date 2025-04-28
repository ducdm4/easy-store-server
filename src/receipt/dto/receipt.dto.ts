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
  priceDiscounted: number;
  note: string;
  groupNumber: number;

  topping: {
    id: number;
    productId: number;
    product: CommonIdDto;
    quantity: number;
    price: number;
    priceDiscounted: number;
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
  totalDiscountAmount: number;

  @IsNotEmpty()
  @IsNumber()
  storeId: number;
}
