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

  price: string;

  commissionRate: string;
  @IsNumber()
  commissionType: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

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
