import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  originalPrice: string;
  commissionRate: string;
  @IsNumber()
  commissionType: number;

  @IsNumber()
  expiryTime: number;

  @IsNumber()
  timesCanUse: number;

  price: string;
  store: {
    id: number;
  };
  image: {
    id: number;
  };

  packageProductQuantity: Array<CreatePackageProductDto>;
}

class BasicID {
  @IsNumber()
  id: number;
}

export class CreatePackageProductDto {
  product: BasicID;
  combo: BasicID;

  @IsNumber()
  quantity: number;
}

export class UpdatePackageDto extends CreatePackageDto {
  @IsNumber()
  id: number;
}
