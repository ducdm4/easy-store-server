import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  UseFilters,
} from '@nestjs/common';
import { In, Not, Repository } from 'typeorm';
import {
  CreateStoreDto,
  // CreateUserDto,
  // ChangePasswordDto,
  // UpdateUserPayloadDto,
} from './dto/store.dto';
import * as bcrypt from 'bcrypt';
import { ROLE_LIST } from 'src/common/constant';
import { UserEntity } from '../typeorm/entities/user.entity';
import { StoreEntity } from '../typeorm/entities/store.entity';
import { dataSource } from '../database/database.providers';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { error } from 'console';

@Injectable()
export class StoresService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('STORE_REPOSITORY')
    private storeRepository: Repository<StoreEntity>,
  ) {}

  async addNewStoreByOwner(storeData: CreateStoreDto, user: { id: number }) {
    const store = this.storeRepository.create({
      ...storeData,
      paymentDate: storeData.paymentDate || 1,
      user: {
        id: user.id,
      },
    });
    await this.storeRepository.save(store);
    return store;
  }

  async getStoreByOwnerId(userId: number) {
    const store = await this.storeRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return store;
  }

  async checkStoreOwner(storeList: Array<{ id: string }>, storeId: string) {
    if (storeList.findIndex((store) => store.id.toString() === storeId) > -1) {
      return true;
    } else {
      throw new ForbiddenException('You are not owner of this store');
    }
  }

  async getStoreInfo(id: number) {
    const store = await this.storeRepository.findOne({
      select: {
        id: true,
        passCode: true,
        name: true,
        address: true,
        description: true,
        paymentDate: true,
        hotline: true,
        facebookUrl: true,
        tiktokUrl: true,
        youtubeUrl: true,
        logoPicture: {
          id: true,
        },
      },
      where: {
        id,
      },
    });
    return store;
  }
}
