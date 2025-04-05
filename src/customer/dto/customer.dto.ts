import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  CreatePersonalInfoDto,
  UpdatePersonalInfoDto,
} from 'src/personalInfo/dto/personalInfo.dto';

export class CreateCustomerDto {
  personalInfo: CreatePersonalInfoDto;
  store: {
    id: number;
  };
}

export class UpdateCustomerDto extends CreateCustomerDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  personalInfo: UpdatePersonalInfoDto;
}
