import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  displayed: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isTopping: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isToppingRequired: boolean;

  @IsNumber()
  displayOrder: number;

  max: number;
  store: {
    id: number;
  };
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
