import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  rePassword: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  phone: string;
  dob: string;
  address: string;
  gender: boolean;
  profilePictureId: number;
}

export class UpdateUserDto {
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  role: number;
  lastName: string;
  phone: string;
  dob: string;
  profilePictureId: number;
}

export class UpdateUserPayloadDto {
  firstName: string;
  role: number;
  lastName: string;
  phone: string;
  dob: string;
  profilePictureId: number;
  addressId: number;
}

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
