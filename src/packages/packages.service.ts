import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Like, Not, Repository } from 'typeorm';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdateEmployeeInfoDto,
} from './dto/packages.dto';
import { KeyValue } from 'src/common/constant';
import { PackagesEntity } from '../typeorm/entities/package.entity';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { PhotosService } from '../photo/photos.service';
import { SearchInterface } from 'src/common/interface/search.interface';
import { UserLoggedInDto } from 'src/user/dto/user.dto';

@Injectable()
export class PackagesService {
  constructor(
    @Inject('PACKAGES_REPOSITORY')
    private packagesRepository: Repository<PackagesEntity>,
    private storesService: StoresService,
    private photosService: PhotosService,
  ) {}

  async getListEmployee(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    // const storeCheck = await this.storesService.checkStoreOwner(
    //   storeList,
    //   storeId,
    // );
    // if (storeCheck) {
    //   const employeeQuery = await dataSource
    //     .createQueryBuilder()
    //     .select([
    //       'employee.id',
    //       'personalInfo.email',
    //       'personalInfo.lastName',
    //       'personalInfo.firstName',
    //       'personalInfo.phone',
    //       'employee.isActive',
    //     ])
    //     .from(EmployeeInfoEntity, 'employee')
    //     .innerJoin('employee.personalInfo', 'personalInfo')
    //     .where('employee.storeId = :storeId', { storeId })
    //     .skip((findOptions.paging.page - 1) * findOptions.paging.size)
    //     .take(findOptions.paging.size);
    //   if (findOptions.sort.length) {
    //     findOptions.sort.forEach((sort) => {
    //       if (sort.key === 'email') {
    //         employeeQuery.orderBy('personalInfo.email', sort.value);
    //       } else if (sort.key === 'name') {
    //         employeeQuery.orderBy('personalInfo.firstName', sort.value);
    //         employeeQuery.addOrderBy('personalInfo.lastName', sort.value);
    //       } else {
    //         employeeQuery.orderBy(sort.key, sort.value);
    //       }
    //     });
    //   }
    //   if (findOptions.keyword) {
    //     employeeQuery.andWhere(
    //       `(personalInfo.email LIKE :keyword OR personalInfo.lastName + ' ' + personalInfo.firstName LIKE :keyword)`,
    //       {
    //         keyword: '%' + findOptions.keyword + '%',
    //       },
    //     );
    //   }
    //   if (findOptions.filter.length) {
    //     findOptions.filter.forEach((fil) => {
    //       if (fil.key === 'isVerified') {
    //         employeeQuery.andWhere('employee.isVerified = :verified', {
    //           verified: fil.value,
    //         });
    //       }
    //       if (fil.key === 'isActive') {
    //         employeeQuery.andWhere('employee.isActive = :active', {
    //           active: fil.value,
    //         });
    //       }
    //     });
    //   }
    //   const data = await employeeQuery.getManyAndCount();
    //   return {
    //     list: data[0],
    //     total: data[1],
    //     page: findOptions.paging.page,
    //   };
    // }
  }
}
