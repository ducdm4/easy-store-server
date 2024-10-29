import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  type: number;
  image: {
    id: number;
  };

  originalPrice: string;
  price: string;

  commissionRate: string;
  @IsNumber()
  commissionType: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsBoolean()
  isActive: boolean;

  duration: number;
  @IsString()
  barcode: string;

  store: {
    id: number;
  };
}

export class UpdateProductDto extends CreateProductDto {
  @IsNumber()
  id: number;
}
