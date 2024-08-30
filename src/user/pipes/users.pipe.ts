import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UsersPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    const { password, rePassword } = value;
    this.validPassword(password, rePassword);
    return value;
  }

  validPassword(password: string, rePassword: string): boolean {
    const regExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
    if (!regExp.test(password))
      throw new BadRequestException('Password does not meet requirement');

    if (password !== rePassword) {
      throw new BadRequestException('Password does not match');
    }
    return true;
  }
}
