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
} from './dto/employee.dto';
import { KeyValue } from 'src/common/constant';
import { EmployeeInfoEntity } from '../typeorm/entities/employeeInfo.entity';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { PersonalInfoService } from '../personalInfo/personalInfo.service';
import { PhotosService } from '../photo/photos.service';
import { SearchInterface } from 'src/common/interface/search.interface';
import { UserLoggedInDto } from 'src/user/dto/user.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_INFO_REPOSITORY')
    private employeeInfoRepository: Repository<EmployeeInfoEntity>,
    private storesService: StoresService,
    private personalInfoService: PersonalInfoService,
    private photosService: PhotosService,
  ) {}

  async addNewEmployee(employeeData: CreateEmployeeDto, user: UserLoggedInDto) {
    const storeCheck = await this.storesService.checkStoreOwner(
      user.storeList,
      employeeData.employeeInfo.store.id.toString(),
    );
    if (storeCheck) {
      if (!employeeData.employeeInfo.identityCardImage1?.id)
        delete employeeData.employeeInfo.identityCardImage1;
      if (!employeeData.employeeInfo.identityCardImage2?.id)
        delete employeeData.employeeInfo.identityCardImage2;
      if (!employeeData.personalInfo.profilePicture?.id)
        delete employeeData.personalInfo.profilePicture;
      if (!employeeData.employeeInfo.dayOffPerMonth)
        employeeData.employeeInfo.dayOffPerMonth = null;

      const personalInfo = await this.personalInfoService.createNewPersonalInfo(
        employeeData.personalInfo,
      );

      if (personalInfo) {
        const employeeInfo = this.employeeInfoRepository.create(
          employeeData.employeeInfo,
        );
        employeeInfo.personalInfo = personalInfo;
        await this.employeeInfoRepository.save(employeeInfo);
        return employeeInfo;
      }
    }
  }

  async getListEmployee(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId,
    );
    if (storeCheck) {
      const employeeQuery = await dataSource
        .createQueryBuilder()
        .select([
          'employee.id',
          'personalInfo.email',
          'personalInfo.lastName',
          'personalInfo.firstName',
          'personalInfo.phone',
          'employee.isActive',
        ])
        .from(EmployeeInfoEntity, 'employee')
        .innerJoin('employee.personalInfo', 'personalInfo')
        .where('employee.storeId = :storeId', { storeId })
        .skip((findOptions.paging.page - 1) * findOptions.paging.size)
        .take(findOptions.paging.size);

      if (findOptions.sort.length) {
        findOptions.sort.forEach((sort) => {
          if (sort.key === 'email') {
            employeeQuery.orderBy('personalInfo.email', sort.value);
          } else if (sort.key === 'name') {
            employeeQuery.orderBy('personalInfo.firstName', sort.value);
            employeeQuery.addOrderBy('personalInfo.lastName', sort.value);
          } else {
            employeeQuery.orderBy(sort.key, sort.value);
          }
        });
      }
      if (findOptions.keyword) {
        employeeQuery.andWhere(
          `(personalInfo.email LIKE :keyword OR personalInfo.lastName + ' ' + personalInfo.firstName LIKE :keyword)`,
          {
            keyword: '%' + findOptions.keyword + '%',
          },
        );
      }
      if (findOptions.filter.length) {
        findOptions.filter.forEach((fil) => {
          if (fil.key === 'isVerified') {
            employeeQuery.andWhere('employee.isVerified = :verified', {
              verified: fil.value,
            });
          }
          if (fil.key === 'isActive') {
            employeeQuery.andWhere('employee.isActive = :active', {
              active: fil.value,
            });
          }
        });
      }

      const data = await employeeQuery.getManyAndCount();
      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
      };
    }
  }

  async getEmployeeDetail(id: string, storeList: Array<{ id: string }>) {
    const employee = await this.employeeInfoRepository.findOne({
      where: { id: parseInt(id) },
      relations: {
        personalInfo: {
          profilePicture: true,
        },
        identityCardImage1: true,
        identityCardImage2: true,
        store: true,
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      employee.store.id.toString(),
    );
    if (storeCheck) {
      return employee;
    }
  }

  async updateEmployeeDetail(
    employeeId: string,
    storeList: Array<{ id: string }>,
    updateEmployeeData: UpdateEmployeeDto,
  ) {
    const employee = await this.employeeInfoRepository.findOne({
      where: { id: parseInt(employeeId) },
      relations: {
        personalInfo: {
          profilePicture: true,
        },
        identityCardImage1: true,
        identityCardImage2: true,
        store: true,
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      employee.store.id.toString(),
    );
    if (storeCheck) {
      if (updateEmployeeData.personalInfo) {
        const personalInfo = await this.personalInfoService.updatePersonalInfo(
          employee.personalInfo.id,
          updateEmployeeData.personalInfo,
        );
        if (personalInfo) {
          employee.personalInfo = personalInfo;
          if (updateEmployeeData.employeeInfo) {
            const employeeInfo = await this.employeeInfoRepository.preload({
              id: parseInt(employeeId),
              ...updateEmployeeData.employeeInfo,
            });
            if (employeeInfo) {
              await this.employeeInfoRepository.save(employeeInfo);
            }
          }
        }
      }
      return employee;
    }
  }

  async deleteEmployee(id: string, storeList: Array<{ id: string }>) {
    const employee = await this.checkEmployee(id, storeList);
    if (employee) {
      await this.personalInfoService.deletePersonalInfo(
        employee.personalInfo.id,
      );
      if (employee.identityCardImage1) {
        await this.photosService.deletePhoto(
          employee.identityCardImage1.id.toString(),
        );
      }
      if (employee.identityCardImage2) {
        await this.photosService.deletePhoto(
          employee.identityCardImage2.id.toString(),
        );
      }
      await this.employeeInfoRepository.softDelete(parseInt(id));
      return {
        message: 'Employee deleted successfully',
      };
    }
  }

  async checkEmployee(id: string, storeList: Array<{ id: string }>) {
    const employee = await this.employeeInfoRepository.findOne({
      where: { id: parseInt(id) },
      relations: {
        personalInfo: {
          profilePicture: true,
        },
        identityCardImage1: true,
        identityCardImage2: true,
        store: true,
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      employee.store.id.toString(),
    );
    if (storeCheck) {
      return employee;
    }
  }
}
