import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { PersonalInfoService } from '../personalInfo/personalInfo.service';
import { SearchInterface } from 'src/common/interface/search.interface';
import { CustomerEntity } from 'src/typeorm/entities/customer.entity';
import { PersonalInfoEntity } from 'src/typeorm/entities/personalInfo.entity';
import { PhotoEntity } from 'src/typeorm/entities/photo.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<CustomerEntity>,
    private storesService: StoresService,
    private personalInfoService: PersonalInfoService,
  ) {}

  async createNewCustomer(
    data: CreateCustomerDto,
    storeList: Array<{ id: string }>,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      data.store.id.toString(),
    );
    if (storeCheck) {
      const customerCheck = await this.customerRepository.findOne({
        where: {
          store: {
            id: data.store.id,
          },
          personalInfo: {
            phone: data.personalInfo.phone,
          },
        },
      });
      if (customerCheck) {
        throw new BadRequestException(
          'Customer with this phone number is already exists',
        );
      }
      const personalInfo = await this.personalInfoService.createNewPersonalInfo(
        data.personalInfo,
      );
      if (personalInfo.id) {
        const customer = this.customerRepository.create({
          personalInfo: personalInfo,
          joinedDate: new Date(),
          store: {
            id: data.store.id,
          },
        });
        await this.customerRepository.save(customer);
        return customer;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getListCustomer(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId,
    );
    if (storeCheck) {
      const customerQuery = dataSource
        .createQueryBuilder()
        .select(['customer.id', 'customer.point', 'customer.joinedDate'])
        .from(CustomerEntity, 'customer')
        .innerJoinAndMapOne(
          'customer.personalInfo',
          PersonalInfoEntity,
          'personalInfo',
          'personalInfo.id = customer.personalInfoId',
        )
        .leftJoinAndMapOne(
          'personalInfo.profilePicture',
          PhotoEntity,
          'profilePicture',
          'profilePicture.id = personalInfo.profilePictureId',
        )
        .where('customer.storeId = :storeId', { storeId });
      if (findOptions.paging.page !== 0) {
        customerQuery.skip(
          (findOptions.paging.page - 1) * findOptions.paging.size,
        );
        customerQuery.take(findOptions.paging.size);
      }
      if (findOptions.sort.length) {
        findOptions.sort.forEach((sort) => {
          if (sort.key === 'name') {
            customerQuery.orderBy('personalInfo.firstName', sort.value);
            customerQuery.addOrderBy('personalInfo.lastName', sort.value);
          } else if (sort.key === 'phone') {
            customerQuery.orderBy('personalInfo.phone', sort.value);
          } else if (sort.key === 'joinedDate') {
            customerQuery.orderBy('customer.joinedDate', sort.value);
          }
        });
      }
      if (findOptions.keyword) {
        customerQuery.andWhere(
          'personalInfo.firstName LIKE :keyword OR personalInfo.lastName LIKE :keyword OR personalInfo.phone LIKE :keyword',
          {
            keyword: '%' + findOptions.keyword + '%',
          },
        );
      }
      if (findOptions.filter.length) {
        findOptions.filter.forEach(async (fil) => {
          if (fil.key === 'gender') {
            customerQuery.andWhere('personalInfo.gender = :gender', {
              gender: fil.value,
            });
          }
        });
      }
      const data = await customerQuery.getManyAndCount();
      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
      };
    }
  }

  async updateCustomerInfo(
    data: UpdateCustomerDto,
    storeList: Array<{ id: string }>,
  ) {
    const customer = await this.customerRepository.findOne({
      relations: {
        personalInfo: true,
        store: true,
      },
      where: {
        id: data.id,
      },
    });
    if (customer) {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        customer.store.id.toString(),
      );
      if (storeCheck) {
        if (customer.personalInfo.id === data.personalInfo.id) {
          const personalInfo =
            await this.personalInfoService.updatePersonalInfo(
              data.personalInfo.id,
              data.personalInfo,
            );
          if (personalInfo) {
            const customerInfo = await this.customerRepository.save({
              ...data,
            });
            if (customerInfo) {
              return customerInfo;
            }
          }
        } else {
          throw new BadRequestException('Personal info id is not match');
        }
      }
    } else {
      throw new NotFoundException('Customer not found');
    }
  }

  // async getComboById(id: number, storeList: Array<{ id: string }>) {
  //   const combo = await this.comboRepository.findOne({
  //     relations: {
  //       store: true,
  //       comboQuantity: {
  //         productUsed: {
  //           image: true,
  //         },
  //         toppingQuantity: {
  //           product: {
  //             image: true,
  //           },
  //         },
  //       },
  //       image: true,
  //     },
  //     where: {
  //       id,
  //     },
  //   });
  //   if (combo) {
  //     const storeCheck = await this.storesService.checkStoreOwner(
  //       storeList,
  //       combo.store.id.toString(),
  //     );
  //     if (storeCheck) {
  //       return combo;
  //     }
  //   } else {
  //     throw new NotFoundException('Combo not found');
  //   }
  // }

  // async updateComboStatus(id: number, storeList: Array<{ id: string }>) {
  //   const combo = await this.comboRepository.findOne({
  //     relations: {
  //       store: true,
  //     },
  //     where: {
  //       id,
  //     },
  //   });
  //   if (!combo) {
  //     throw new NotFoundException('Combo not found');
  //   } else {
  //     const storeCheck = await this.storesService.checkStoreOwner(
  //       storeList,
  //       combo.store.id.toString(),
  //     );
  //     if (storeCheck) {
  //       const newCombo = {
  //         ...combo,
  //         isActive: !combo.isActive,
  //       };
  //       await this.comboRepository.save(newCombo);
  //       return newCombo;
  //     }
  //   }
  // }

  // async deleteCombo(id: number, storeList: Array<{ id: string }>) {
  //   const combo = await this.comboRepository.findOne({
  //     relations: {
  //       store: true,
  //       image: true,
  //       comboQuantity: {
  //         toppingQuantity: true,
  //       },
  //     },
  //     where: {
  //       id,
  //     },
  //   });
  //   if (!combo) {
  //     throw new NotFoundException('Combo not found');
  //   } else {
  //     const storeCheck = await this.storesService.checkStoreOwner(
  //       storeList,
  //       combo.store.id.toString(),
  //     );
  //     if (storeCheck) {
  //       await this.comboRepository.softRemove(combo);
  //       return true;
  //     }
  //   }
  // }

  // async getAllByStoreId(storeId: number, storeList: Array<{ id: string }>) {
  //   const storeCheck = await this.storesService.checkStoreOwner(
  //     storeList,
  //     storeId.toString(),
  //   );
  //   if (storeCheck) {
  //     const combo = await this.comboRepository.find({
  //       relations: {
  //         store: true,
  //         image: true,
  //       },
  //       where: {
  //         store: {
  //           id: storeId,
  //         },
  //         isActive: true,
  //       },
  //     });
  //     return combo;
  //   }
  // }
}
