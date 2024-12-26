import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class commonDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateTransactionsDto {
  product: commonDto;

  @IsString()
  reason: string;

  @IsNumber()
  type: number;

  @IsNumber()
  quantity: number;

  @IsString()
  date: string;

  @IsString()
  spendAmount: string;
}
