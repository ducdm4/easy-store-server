import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateComboDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  image: {
    id: number;
  };

  price: string;
  store: {
    id: number;
  };

  comboQuantity: Array<CreateComboQuantityDto>;
}

class Product {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
export class CreateComboQuantityDto {
  @IsNotEmpty()
  @IsNumber()
  productUsed: Product;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  toppingQuantity: Array<CreateComboProductToppingDto>;
}

export class UpdateComboQuantityDto extends CreateComboQuantityDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  toppingQuantity: Array<UpdateComboProductToppingDto>;
}

export class CreateComboProductToppingDto {
  product: Product;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class UpdateComboProductToppingDto extends CreateComboProductToppingDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateComboDto extends CreateComboDto {
  @IsNumber()
  id: number;
  comboQuantity: Array<UpdateComboQuantityDto>;
}
