import { IsNotEmpty, IsString } from 'class-validator';

export class ConfigDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  store: {
    id: number;
  };
}
