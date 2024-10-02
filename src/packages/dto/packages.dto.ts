import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';
import {
  CreatePersonalInfoDto,
  UpdatePersonalInfoDto,
} from 'src/personalInfo/dto/personalInfo.dto';

export class CreateEmployeeInfoDto {
  @IsNotEmpty()
  @IsBoolean()
  isVerified: boolean;

  identityCardImage1: {
    id: number;
  };

  identityCardImage2: {
    id: number;
  };

  dayOffPerMonth: number;
  joinedDate: string;
  salary: string;
  store: {
    id: number;
  };
}

export class CreateEmployeeDto {
  employeeInfo: CreateEmployeeInfoDto;
  personalInfo: CreatePersonalInfoDto;
}

export class UpdateEmployeeDto {
  employeeInfo: UpdateEmployeeInfoDto;
  personalInfo: UpdatePersonalInfoDto;
}

export class UpdateEmployeeInfoDto extends CreateEmployeeInfoDto {
  @IsNumber()
  id: number;
}
