import { IsNotEmpty, IsNumber } from 'class-validator';

class CommonIdDto {
  id: number;
}
export class ReceiptProduct {
  id: number;

  product: CommonIdDto;
  combo: CommonIdDto;
  package: CommonIdDto;
  packagePurchased: CommonIdDto;

  quantity: number;
  price: number;
  priceDiscounted: number;
  note: string;
  groupNumber: number;

  topping: {
    id: number;
    product: CommonIdDto;
    quantity: number;
    price: number;
    priceDiscounted: number;
  }[];
}
export class CreateReceiptDto {
  @IsNumber()
  subTotal: number;
  @IsNumber()
  total: number;
  @IsNumber()
  type?: number;

  extraDiscount?: number;
  receiptProducts: ReceiptProduct[];
  customer?: {
    id?: number;
  };

  createdBy?: {
    id?: number;
  };
  note: string;

  @IsNumber()
  totalDiscountAmount: number;

  @IsNotEmpty()
  @IsNumber()
  storeId: number;
}
