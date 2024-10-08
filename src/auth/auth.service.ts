import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ROLE_LIST } from 'src/common/constant';
import { StoresService } from 'src/store/stores.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private storeService: StoresService,
  ) {}

  async signIn(loginInfo: SignInDto) {
    const { email, password } = loginInfo;
    const user = await this.userRepository.findOne({
      select: {
        id: true,
        password: true,
        role: true,
        personalInfo: {
          email: true,
          firstName: true,
          lastName: true,
          profilePicture: {
            id: true,
          },
        },
      },
      relations: {
        personalInfo: true,
      },
      where: {
        role: ROLE_LIST.STORE_OWNER,
        personalInfo: {
          email: email,
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      delete user.password;
      const storeList = await this.storeService.getStoreByOwnerId(user.id);
      const tokens = await this.getTokens({
        id: user.id,
        role: user.role,
        ...user.personalInfo,
        storeList: storeList.map((item) => {
          return {
            id: item.id,
          };
        }),
      });
      return {
        tokens,
        user: {
          id: user.id,
          role: user.role,
          email: user.personalInfo.email,
          firstName: user.personalInfo.firstName,
          lastName: user.personalInfo.lastName,
        },
        storeList,
      };
    } else {
      throw new NotFoundException('Incorrect login info');
    }
  }

  async getTokens(user: Express.User) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(user, {
        secret: process.env.JWT_SECRET,
        expiresIn: '12h',
      }),
    ]);

    return {
      accessToken,
    };
  }
}
