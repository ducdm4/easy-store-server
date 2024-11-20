import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePromoCodeDto {
  @IsString()
  code: string;

  @IsString()
  description: string;

  quantity: number;
  @IsNotEmpty()
  discountType: number;

  discountAmount: number;
  itemQuantity: number;

  timeStart: Date;
  timeEnd: Date;
  @IsNotEmpty()
  canUseWithOther: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isPaused: boolean;

  product: {
    id: number;
  };

  combo: {
    id: number;
  };

  package: {
    id: number;
  };

  store: {
    id: number;
  };
}

export class UpdatePromoCodeDto extends CreatePromoCodeDto {
  id: number;
}
