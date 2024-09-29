import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { In, Like, Not, Repository } from 'typeorm';
import {
  CreatePersonalInfoDto,
  UpdatePersonalInfoDto,
} from './dto/personalInfo.dto';
import { KeyValue } from 'src/common/constant';
import { EmployeeInfoEntity } from '../typeorm/entities/employeeInfo.entity';
import { PersonalInfoEntity } from '../typeorm/entities/personalInfo.entity';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { PhotosService } from '../photo/photos.service';
import { SearchInterface } from 'src/common/interface/search.interface';

@Injectable()
export class PersonalInfoService {
  constructor(
    @Inject('PERSONAL_INFO_REPOSITORY')
    private personalInfoRepository: Repository<PersonalInfoEntity>,
    private storesService: StoresService,
    private photosService: PhotosService,
  ) {}

  async createNewPersonalInfo(personalInfo: CreatePersonalInfoDto) {
    const newPersonalInfo = this.personalInfoRepository.create(personalInfo);
    await this.personalInfoRepository.save(newPersonalInfo);

    return newPersonalInfo;
  }

  async updatePersonalInfo(
    id: number,
    personalInfoData: UpdatePersonalInfoDto,
  ) {
    const personalInfo = await this.personalInfoRepository.findOne({
      relations: {
        profilePicture: true,
      },
      where: {
        id,
      },
    });
    if (!personalInfo) {
      throw new BadRequestException('Personal info not found');
    }
    Object.assign(personalInfo, personalInfoData);
    await this.personalInfoRepository.save(personalInfo);
    return personalInfo;
  }

  async deletePersonalInfo(id: number) {
    const personalInfo = await this.personalInfoRepository.findOne({
      relations: {
        profilePicture: true,
      },
      where: { id },
    });
    if (!personalInfo) {
      throw new BadRequestException('Personal info not found');
    }
    if (personalInfo.profilePicture) {
      await this.photosService.deletePhoto(personalInfo.profilePicture.id);
    }
    return await this.personalInfoRepository.softDelete(id);
  }
}
