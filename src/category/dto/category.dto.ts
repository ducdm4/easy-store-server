import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  displayed: boolean;

  @IsNumber()
  displayOrder: number;
  store: {
    id: number;
  };
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
