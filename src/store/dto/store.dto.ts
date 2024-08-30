import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  description: string;
  @IsNotEmpty()
  passCode: string;

  logoPicture: {
    id: number;
  };

  paymentDate: number;
  hotline: string;
  youtubeUrl: string;
  address: string;
  tiktokUrl: string;
  facebookUrl: string;
}

export class UpdateStoreDto {
  @IsNumber()
  id: number;
  @IsNotEmpty()
  name: string;

  description: string;
  @IsNotEmpty()
  passCode: string;

  logoPicture: {
    id: number;
  };

  paymentDate: number;
  hotline: string;
  youtubeUrl: string;
  address: string;
  tiktokUrl: string;
  facebookUrl: string;
}
