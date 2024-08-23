import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../typeorm/entities/user.entity';
import { UsersService } from '../user/users.service';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ROLE_LIST } from '../common/constant';
import { EmployeesService } from '../employee/employees.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginInfo: SignInDto) {
    const { email, password } = loginInfo;
    const user = await this.userRepository.findOne({
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        firstName: true,
        lastName: true,
      },
      relations: {
        profilePicture: true,
      },
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      delete user.password;
      let employeeInfo = null;
      if (user.role !== ROLE_LIST.ADMIN && user.role !== ROLE_LIST.CUSTOMER) {
        employeeInfo = await this.employeesService.getEmployeeByUserId(user.id);
      }
      const tokens = await this.getTokens({ ...user, employeeInfo });
      return {
        tokens,
        user: {
          ...user,
          employeeInfo,
        },
      };
    } else {
      throw new NotFoundException('Incorrect login info');
    }
  }

  async getTokens(user: Express.User) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(user, {
        secret: process.env.JWT_SECRET,
        expiresIn: '6h',
      }),
    ]);

    return {
      accessToken,
    };
  }
}
