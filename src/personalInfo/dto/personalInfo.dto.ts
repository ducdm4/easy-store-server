import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePersonalInfoDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsNotEmpty()
  phone: string;

  profilePicture: {
    id: number;
  };

  dob: string;
  gender: boolean;
}

export class UpdatePersonalInfoDto extends CreatePersonalInfoDto {
  @IsNumber()
  id: number;
}
