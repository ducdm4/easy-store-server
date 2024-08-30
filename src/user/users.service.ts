import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { In, Not, Repository } from 'typeorm';
import {
  UpdateUserDto,
  CreateUserDto,
  ChangePasswordDto,
  UpdateUserPayloadDto,
} from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { AuthService } from '../auth/auth.service';
import { ROLE_LIST } from 'src/common/constant';
import { UserEntity } from '../typeorm/entities/user.entity';
import { PersonalInfoEntity } from '../typeorm/entities/personalInfo.entity';
import { dataSource } from '../database/database.providers';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('PERSONAL_INFO_REPOSITORY')
    private personalInfoRepository: Repository<PersonalInfoEntity>,
    private mailService: MailService,
    private authService: AuthService,
  ) {}
  getUser() {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    } else {
      throw new BadRequestException('user not found');
    }
  }

  async addUser(user: CreateUserDto, password: string) {
    const { email } = user;
    const existingUser = await this.userRepository.findOne({
      select: {
        id: true,
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
    if (existingUser) {
      throw new BadRequestException('User with this email is already exist');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser: UserEntity;
    let newPersonalInfo: PersonalInfoEntity;

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      newPersonalInfo = this.personalInfoRepository.create({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || null,
        dob: user.dob || null,
        gender: user.gender,
        address: user.address,
      });

      await queryRunner.manager.save(newPersonalInfo);
      newUser = this.userRepository.create({
        ...user,
        password: hashedPassword,
        role: ROLE_LIST.STORE_OWNER,
        personalInfo: {
          id: newPersonalInfo.id,
        },
        createdAt: new Date(),
      });

      await queryRunner.manager.save(newUser);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'Something went wrong, please try again',
      );
    } finally {
      await queryRunner.release();
    }

    //TODO: send mail verify user
    delete newUser.password;
    delete newUser.personalInfo;

    const userInfo = {
      id: newUser.id,
      email: newPersonalInfo.email,
      firstName: newPersonalInfo.firstName,
      lastName: newPersonalInfo.lastName,
      role: newUser.role,
    };

    const tokens = await this.authService.getTokens(userInfo);
    return { user: userInfo, tokens };
    // return '';
  }

  async updateUser(id: number, updateUserDetails: UpdateUserDto) {
    return await this.userRepository.update({ id }, { ...updateUserDetails });
  }

  async updateSelfInfo(updateUserDetails: UpdateUserPayloadDto, id: number) {
    const data = updateUserDetails;
    if (data.role) delete data.role;
    const result = await this.userRepository.update({ id }, data);
    return result;
  }

  async updatePassword(passwordInfo: ChangePasswordDto, user: Express.User) {
    const userInfo = await this.userRepository.findOne({
      select: {
        password: true,
        personalInfo: {
          firstName: true,
          lastName: true,
        },
      },
      where: {
        id: user['id'],
      },
    });
    const isMatch = await bcrypt.compare(
      passwordInfo.oldPassword,
      userInfo.password,
    );
    if (isMatch) {
      const reg =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
      if (reg.test(passwordInfo.newPassword)) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(
          passwordInfo.newPassword,
          salt,
        );
        const result = await this.userRepository.update(
          { id: user['id'] },
          { password: hashedPassword },
        );
        await this.mailService.sendEmailChangePassword(
          `${userInfo.personalInfo.firstName} ${userInfo.personalInfo.lastName}`,
        );
        return result;
      } else {
        throw new BadRequestException('New password not meet requirements!');
      }
    } else {
      throw new BadRequestException('Wrong current password!');
    }
  }

  async findSelfUser(user: Express.User) {
    const userLoggedInfo = await this.userRepository.findOne({
      relations: {},
    });
    return userLoggedInfo;
  }

  async getUserVerified(id: number, role: number) {
    const userRes = await this.userRepository.findOne({
      select: {
        id: true,
        role: true,
        personalInfo: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      relations: {
        personalInfo: true,
      },
      where: {
        id,
      },
    });
    const data = {
      id: userRes.id,
      email: userRes.personalInfo.email,
      firstName: userRes.personalInfo.firstName,
      lastName: userRes.personalInfo.lastName,
      role: userRes.role,
    };
    return data;
  }

  async updateNotificationToken(id: number, token: string) {
    const user = await this.userRepository.findOneBy({ id });
    user.notificationToken = token;
    return await this.userRepository.save(user);
  }

  async getListEmployeeHasToken() {
    const res = await this.userRepository.find({
      select: {
        notificationToken: true,
      },
      where: {
        notificationToken: Not(''),
        deletedAt: null,
      },
    });
    return res;
  }
}
