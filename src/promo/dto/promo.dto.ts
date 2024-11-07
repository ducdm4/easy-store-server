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

  timeStart: Date;
  timeEnd: Date;
  @IsNotEmpty()
  canUseWithOther: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isPaused: boolean;

  products: Array<{
    id: number;
  }>;

  combos: Array<{
    id: number;
  }>;

  packages: Array<{
    id: number;
  }>;

  store: {
    id: number;
  };
}
