import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from '../typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ROLE_LIST } from 'src/common/constant';
import { StoresService } from 'src/store/stores.service';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private storeService: StoresService,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
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

  async switchRole(
    user: { id: number; storeList?: Array<{ id: string }>; role: number },
    data: { passCode: string; storeId: number },
  ) {
    if (user.role === ROLE_LIST.STORE_OWNER) {
      const storeCheck = this.storeService.checkStoreOwner(
        user.storeList,
        data.storeId.toString(),
      );
      if (storeCheck) {
        const tokens = await this.getTokens({
          id: user.id,
          role: ROLE_LIST.STORE_SALE,
          store: data.storeId,
        });
        return {
          tokens,
          user: {
            id: user.id,
            role: user.role,
          },
          store: data.storeId,
        };
      }
    } else if (user.role === ROLE_LIST.STORE_SALE) {
      const store = await this.storeService.getStoreInfo(data.storeId);
      if (store.passCode === data.passCode) {
        return await this.userService.getUserVerified(user.id);
      } else {
        throw new BadRequestException('Incorrect passcode');
      }
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
