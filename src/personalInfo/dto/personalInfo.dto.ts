import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePersonalInfoDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  phone: string;

  profilePicture: {
    id: number;
  };

  dob: string;
  gender: boolean;

  description: string;
}

export class UpdatePersonalInfoDto extends CreatePersonalInfoDto {
  @IsNumber()
  id: number;
}
