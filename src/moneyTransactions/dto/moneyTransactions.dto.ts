import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class commonDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateTransactionsDto {
  @IsString()
  reason: string;

  @IsNumber()
  type: number;

  @IsString()
  amount: string;

  @IsString()
  date: string;

  store: commonDto;
}
export class CreateMoneyInBalanceDto {
  date: string;
  amount: number;
  type: number;
  store: commonDto;
}
