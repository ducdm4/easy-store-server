import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryEntity } from '../typeorm/entities/category.entity';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { SearchInterface } from 'src/common/interface/search.interface';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<CategoryEntity>,
    private storesService: StoresService,
  ) {}

  async createNewCategory(
    data: CreateCategoryDto,
    storeList: Array<{ id: string }>,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      data.store.id.toString(),
    );
    if (storeCheck) {
      const category = this.categoryRepository.create({
        name: data.name,
        store: { id: data.store.id },
        displayed: data.displayed,
        displayOrder: data.displayOrder,
      });
      await this.categoryRepository.save(category);
      return category;
    }
  }

  async getListCategory(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId,
    );
    if (storeCheck) {
      const query = dataSource
        .createQueryBuilder()
        .select([
          'category.id',
          'category.name',
          'category.displayed',
          'category.displayOrder',
        ])
        .from(CategoryEntity, 'category')
        .where('category.storeId = :storeId', { storeId });
      if (findOptions.sort.length) {
        findOptions.sort.forEach((sort) => {
          if (sort.key === 'name') {
            query.orderBy('category.name', sort.value);
          } else if (sort.key === 'displayOrder') {
            query.orderBy('category.displayOrder', sort.value);
          }
        });
      }
      if (findOptions.keyword) {
        query.andWhere('category.name LIKE :keyword', {
          keyword: '%' + findOptions.keyword + '%',
        });
      }
      if (findOptions.filter.length) {
        findOptions.filter.forEach(async (fil) => {
          if (fil.key === 'ids') {
            query.andWhere(`category.id IN (:...ids)`, {
              ids: fil.value,
            });
          }
          if (fil.key === 'displayed') {
            query.andWhere(`category.displayed = :displayed`, {
              displayed: fil.value,
            });
          }
        });
      }
      const data = await query.getManyAndCount();
      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
      };
    }
  }

  async updateCategoryInfo(
    data: UpdateCategoryDto,
    storeList: Array<{ id: string }>,
  ) {
    const category = await this.categoryRepository.findOne({
      relations: {
        store: true,
      },
      where: {
        id: data.id,
      },
    });
    if (category) {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        category.store.id.toString(),
      );
      if (storeCheck) {
        const newCategory = {
          ...category,
          ...data,
        };

        await this.categoryRepository.save(newCategory);
        return newCategory;
      }
    } else {
      throw new NotFoundException('Category not found');
    }
  }

  async deleteCategory(id: number, storeList: Array<{ id: string }>) {
    const category = await this.categoryRepository.findOne({
      relations: {
        store: true,
      },
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    } else {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        category.store.id.toString(),
      );
      if (storeCheck) {
        await this.categoryRepository.softRemove(category);
        return true;
      }
    }
  }
}
