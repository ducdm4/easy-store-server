import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { In, Like, Not, Repository } from 'typeorm';
import {
  CreateSpaceDto,
  CreateSpaceUnitDto,
  UpdateSpaceDto,
  UpdateSpaceUnitDto,
} from './dto/space.dto';
import { KeyValue } from 'src/common/constant';
import { SpaceEntity } from '../typeorm/entities/space.entity';
import { SpaceUnitEntity } from '../typeorm/entities/spaceUnit.entity';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { SearchInterface } from 'src/common/interface/search.interface';

@Injectable()
export class SpacesService {
  constructor(
    @Inject('SPACE_REPOSITORY')
    private spaceRepository: Repository<SpaceEntity>,
    @Inject('SPACE_UNIT_REPOSITORY')
    private spaceUnitRepository: Repository<SpaceUnitEntity>,
    private storesService: StoresService,
  ) {}

  async addNewSpaceByOwner(
    spaceData: CreateSpaceDto,
    user: { id: number; storeList: Array<{ id: string }> },
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      user.storeList,
      spaceData.store.id.toString(),
    );
    if (storeCheck) {
      const space = this.spaceRepository.create({
        ...spaceData,
      });
      await this.spaceRepository.save(space);
      return space;
    }
  }

  async listAllSpaceGroup(
    user: { storeList: Array<{ id: string }> },
    storeId: string,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      user.storeList,
      storeId,
    );
    if (storeCheck) {
      const list = await this.spaceRepository.find({
        select: {
          id: true,
          name: true,
        },
        where: {
          store: {
            id: parseInt(storeId),
          },
        },
      });

      return list;
    }
    return [];
  }

  async getSpaceListFilter(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId,
    );
    if (storeCheck) {
      const spacesGroup = await dataSource
        .createQueryBuilder()
        .select([
          'spaces.id',
          'spaces.name',
          'spaces.description',
          'spaces.active',
        ])
        .from(SpaceEntity, 'spaces')
        .where('spaces.storeId = :storeId', { storeId })
        .skip((findOptions.paging.page - 1) * findOptions.paging.size)
        .take(findOptions.paging.size);

      if (findOptions.sort.length) {
        findOptions.sort.forEach((sort) => {
          spacesGroup.orderBy(sort.key, sort.value);
        });
      }
      if (findOptions.keyword) {
        spacesGroup.andWhere(
          '(spaces.name LIKE :keyword OR spaces.description LIKE :keyword)',
          {
            keyword: '%' + findOptions.keyword + '%',
          },
        );
      }
      if (findOptions.filter.length) {
        findOptions.filter.forEach((fil) => {
          if (fil.key === 'active') {
            spacesGroup.andWhere('spaces.active IN (:...actives)', {
              actives: fil.value,
            });
          }
        });
      }

      const data = await spacesGroup.getManyAndCount();
      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
      };
    }
  }

  async getSpaceUnitListFilter(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId,
    );
    if (storeCheck) {
      const spacesUnit = await dataSource
        .createQueryBuilder()
        .select([
          'spaceUnit.id',
          'spaceUnit.name',
          'spaceUnit.description',
          'spaceUnit.status',
          'spaces.id',
          'spaces.name',
        ])
        .from(SpaceUnitEntity, 'spaceUnit')
        .innerJoin('spaceUnit.space', 'spaces')
        .where('spaces.storeId = :storeId', { storeId })
        .skip((findOptions.paging.page - 1) * findOptions.paging.size)
        .take(findOptions.paging.size);

      if (findOptions.sort.length) {
        findOptions.sort.forEach((sort) => {
          spacesUnit.orderBy(sort.key, sort.value);
        });
      }
      if (findOptions.keyword) {
        spacesUnit.andWhere(
          '(spaces.name LIKE :keyword OR spaces.description LIKE :keyword)',
          {
            keyword: '%' + findOptions.keyword + '%',
          },
        );
      }
      if (findOptions.filter.length) {
        findOptions.filter.forEach((fil) => {
          if (fil.key === 'space') {
            spacesUnit.andWhere('spaces.id IN (:...spaces)', {
              spaces: fil.value,
            });
          }
          if (fil.key === 'status') {
            spacesUnit.andWhere('spaceUnit.status IN (:...statuses)', {
              statuses: fil.value,
            });
          }
        });
      }

      const data = await spacesUnit.getManyAndCount();
      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
      };
    }
  }

  async changeSpaceGroupStatus(
    params: KeyValue,
    user: { storeList: Array<{ id: string }> },
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      user.storeList,
      params.storeId,
    );
    if (storeCheck) {
      const space = await this.spaceRepository.findOne({
        where: { id: params.id },
      });
      if (space) {
        space.active = !space.active;
        await this.spaceRepository.save(space);
        return space;
      }
    }
  }

  async editSpaceGroup(
    params: KeyValue,
    user: { storeList: Array<{ id: string }> },
    editSpaceGroup: UpdateSpaceDto,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      user.storeList,
      params.storeId,
    );
    if (storeCheck) {
      const space = await this.spaceRepository.findOne({
        where: { id: params.id },
      });
      if (space) {
        space.active = editSpaceGroup.active;
        space.name = editSpaceGroup.name;
        space.description = editSpaceGroup.description;
        await this.spaceRepository.save(space);
        return space;
      }
    }
  }

  async editSpaceUnit(
    params: KeyValue,
    user: { storeList: Array<{ id: string }> },
    editSpaceUnitData: UpdateSpaceUnitDto,
  ) {
    const spaceUnit = await this.spaceUnitRepository.findOne({
      relations: {
        space: {
          store: true,
        },
      },
      where: { id: params.id },
    });
    if (!spaceUnit) {
      throw new HttpException('Space Unit not found', HttpStatus.NOT_FOUND);
    }
    if (spaceUnit.space.id !== editSpaceUnitData.space.id) {
      throw new HttpException('Space Group not match', HttpStatus.BAD_REQUEST);
    }
    const storeCheck = await this.storesService.checkStoreOwner(
      user.storeList,
      spaceUnit.space.store.id.toString(),
    );
    if (storeCheck) {
      spaceUnit.name = editSpaceUnitData.name;
      spaceUnit.description = editSpaceUnitData.description;
      spaceUnit.status = editSpaceUnitData.status;
      spaceUnit.space.id = editSpaceUnitData.space.id;

      await this.spaceUnitRepository.save(spaceUnit);
      return spaceUnit;
    }
  }

  async deleteSpaceGroup(
    params: KeyValue,
    user: { storeList: Array<{ id: string }> },
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      user.storeList,
      params.storeId,
    );
    if (storeCheck) {
      const space = await this.spaceRepository.findOne({
        where: { id: params.id },
      });
      if (space) {
        const res = await this.spaceRepository.softDelete(space);
        return res;
      }
    }
  }

  async deleteSpaceUnit(
    params: KeyValue,
    user: { storeList: Array<{ id: string }> },
  ) {
    const spaceUnit = await this.spaceUnitRepository.findOne({
      relations: {
        space: {
          store: true,
        },
      },
      where: { id: params.id },
    });
    if (!spaceUnit) {
      throw new HttpException('Space Unit not found', HttpStatus.NOT_FOUND);
    }
    const storeCheck = await this.storesService.checkStoreOwner(
      user.storeList,
      spaceUnit.space.store.id.toString(),
    );
    if (storeCheck) {
      const res = await this.spaceUnitRepository.softDelete(spaceUnit);
      return res;
    }
  }

  async addNewSpaceUnit(
    spaceUnitData: CreateSpaceUnitDto,
    user: { id: number; storeList: Array<{ id: string }> },
  ) {
    const space = await this.spaceRepository.findOne({
      select: {
        id: true,
        store: {
          id: true,
        },
      },
      relations: {
        store: true,
      },
      where: { id: spaceUnitData.space.id },
    });
    if (!space) {
      throw new HttpException('Space not found', HttpStatus.NOT_FOUND);
    }
    const storeCheck = await this.storesService.checkStoreOwner(
      user.storeList,
      space.store.id.toString(),
    );
    if (storeCheck) {
      const spaceUnit = this.spaceUnitRepository.create({
        ...spaceUnitData,
      });
      await this.spaceUnitRepository.save(spaceUnit);
      return spaceUnit;
    }
    return null;
  }
}
