import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
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
import { PackagePurchasedEntity } from 'src/typeorm/entities/packagePurchased.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<CustomerEntity>,
    @Inject('PACKAGE_PURCHASED_REPOSITORY')
    private packagePurchasedRepository: Repository<PackagePurchasedEntity>,
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

  async getPackagePurchasedByCustomer(
    customerId: string,
    storeList: Array<{ id: string }>,
  ) {
    const customer = await this.customerRepository.findOne({
      relations: {
        personalInfo: true,
        store: true,
      },
      where: {
        id: Number(customerId),
      },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      customer.store.id.toString(),
    );
    if (storeCheck) {
      const packagePurchased = await this.packagePurchasedRepository.find({
        relations: {
          package: {
            image: true,
            packageProductQuantity: {
              product: {
                image: true,
                toppingCategory: true,
                category: true,
              },
              combo: {
                comboQuantity: {
                  productUsed: true,
                  toppingQuantity: {
                    product: true,
                  },
                },
              },
            },
          },
          customer: true,
        },
        where: {
          customer: {
            id: Number(customerId),
          },
        },
      });
      if (packagePurchased) {
        return packagePurchased;
      }
      return [];
    } else {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }
  }
}
