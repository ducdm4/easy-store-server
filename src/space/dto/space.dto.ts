import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSpaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  description: string;
  @IsNotEmpty()
  store: {
    id: number;
  };
}

export class CreateSpaceUnitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  description: string;

  @IsNotEmpty()
  space: {
    id: number;
  };

  @IsNotEmpty()
  store: {
    id: number;
  };
}

export class UpdateSpaceDto {
  @IsNumber()
  id: number;
  @IsNotEmpty()
  name: string;

  description: string;
  active: boolean;
}

export class UpdateSpaceUnitDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  description: string;
  status: number;

  @IsNotEmpty()
  space: {
    id: number;
  };
}
