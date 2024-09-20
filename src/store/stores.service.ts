import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
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
      throw new BadRequestException('You are not owner of this store');
    }
  }
}
