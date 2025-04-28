import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePackageDto, UpdatePackageDto } from './dto/packages.dto';
import { KeyValue } from 'src/common/constant';
import { PackagesEntity } from '../typeorm/entities/package.entity';
import { PackageProductQuantityEntity } from '../typeorm/entities/packageProductQuantity.entity';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { SearchInterface } from 'src/common/interface/search.interface';
import { ProductEntity } from 'src/typeorm/entities/product.entity';
import { ComboEntity } from 'src/typeorm/entities/combo.entity';
import { ComboQuantityEntity } from 'src/typeorm/entities/comboQuantity.entity';
import { ComboProductToppingEntity } from 'src/typeorm/entities/comboProductTopping.entity';
import { CategoryEntity } from 'src/typeorm/entities/category.entity';

@Injectable()
export class PackagesService {
  constructor(
    @Inject('PACKAGES_REPOSITORY')
    private packagesRepository: Repository<PackagesEntity>,
    private storesService: StoresService,
  ) {}

  async createNewPackage(
    data: CreatePackageDto,
    storeList: Array<{ id: string }>,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      data.store.id.toString(),
    );
    if (storeCheck) {
      const newPackage = this.packagesRepository.create({
        name: data.name,
        description: data.description,
        store: { id: data.store.id },
        timesCanUse: data.timesCanUse,
        expiryTime: data.expiryTime,
        image: data.image ? { id: data.image.id } : null,
        packageProductQuantity: data.packageProductQuantity,
        price: data.price ? parseFloat(data.price) : 0,
        commissionRate: data.commissionRate
          ? parseFloat(data.commissionRate)
          : null,
        commissionType: data.commissionType,
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : 0,
      });
      await this.packagesRepository.save(newPackage);
      return newPackage;
    }
  }

  async getListPackage(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId,
    );
    if (storeCheck) {
      const packageQuery = dataSource
        .createQueryBuilder()
        .select([
          'packages.id',
          'packages.name',
          'packages.description',
          'packages.isActive',
          'packages.price',
          'packages.originalPrice',
          'packages.timesCanUse',
          'packages.expiryTime',
        ])
        .from(PackagesEntity, 'packages')
        .leftJoinAndMapMany(
          'packages.packageProductQuantity',
          PackageProductQuantityEntity,
          'packageProductQuantity',
          'packages.id = packageProductQuantity.packageId',
        )
        .leftJoinAndMapOne(
          'packageProductQuantity.product',
          ProductEntity,
          'productInPackage',
          'packageProductQuantity.productId = productInPackage.id',
        )
        .leftJoinAndSelect(
          'productInPackage.category',
          'productInPackageCategory',
        )
        .leftJoinAndSelect(
          'productInPackage.toppingCategory',
          'toppingCategory',
        )
        .leftJoinAndMapOne(
          'packageProductQuantity.combo',
          ComboEntity,
          'comboInPackage',
          'packageProductQuantity.comboId = comboInPackage.id',
        )
        .leftJoinAndMapMany(
          'comboInPackage.comboQuantity',
          ComboQuantityEntity,
          'comboQuantity',
          'comboInPackage.id = comboQuantity.comboId',
        )
        .leftJoinAndMapOne(
          'comboQuantity.productUsed',
          ProductEntity,
          'productCombo',
          'comboQuantity.productUsedId = productCombo.id',
        )
        .leftJoinAndSelect('productCombo.image', 'productComboImage')
        .leftJoinAndSelect('productCombo.toppingCategory', 'toppingCategory2')
        .leftJoinAndMapMany(
          'comboQuantity.toppingQuantity',
          ComboProductToppingEntity,
          'toppingQuantity',
          'comboQuantity.id = toppingQuantity.comboQuantityId',
        )
        .leftJoinAndMapOne(
          'toppingQuantity.product',
          ProductEntity,
          'productToppingUsed',
          'toppingQuantity.productId = productToppingUsed.id',
        )
        .leftJoinAndSelect(
          'productToppingUsed.image',
          'productToppingUsedImage',
        )
        .leftJoinAndSelect('packages.image', 'photo')
        .leftJoinAndSelect('productInPackage.image', 'productInPackagePhoto')
        .leftJoinAndSelect('comboInPackage.image', 'comboInPackagePhoto')
        .where('packages.storeId = :storeId', { storeId });
      if (findOptions.paging.page !== 0) {
        packageQuery.skip(
          (findOptions.paging.page - 1) * findOptions.paging.size,
        );
        packageQuery.take(findOptions.paging.size);
      }
      if (findOptions.sort.length) {
        findOptions.sort.forEach((sort) => {
          if (sort.key === 'name') {
            packageQuery.addOrderBy('packages.name', sort.value);
          } else if (sort.key === 'price') {
            packageQuery.addOrderBy('packages.price', sort.value);
          } else if (sort.key === 'timesCanUse') {
            packageQuery.addOrderBy('packages.timesCanUse', sort.value);
          }
        });
      }
      if (findOptions.keyword) {
        packageQuery.andWhere(`(packages.name LIKE :keyword)`, {
          keyword: '%' + findOptions.keyword + '%',
        });
      }
      if (findOptions.filter.length) {
        const isProduct =
          findOptions.filter.findIndex((x) => x.key === 'product') > -1;
        const isCombo =
          findOptions.filter.findIndex((x) => x.key === 'combo') > -1;
        if (isProduct || isCombo) {
          packageQuery.andWhere((qb) => {
            const sub = qb
              .subQuery()
              .select('package2.id')
              .from(PackagesEntity, 'package2')
              .innerJoin(
                PackageProductQuantityEntity,
                'packageProductQuantity2',
                'package2.id = packageProductQuantity2.packageId',
              )
              .where('package2.storeId = :storeId', { storeId });
            let subQ = '';
            const subValue = {} as KeyValue;
            if (isProduct) {
              const productValue = findOptions.filter.find(
                (x) => x.key === 'product',
              );
              subValue.productUsed = productValue.value;
              subQ = `packageProductQuantity2.productId IN (:productUsed)`;
            }
            if (isCombo) {
              const comboValue = findOptions.filter.find(
                (x) => x.key === 'combo',
              );
              subValue.combos = comboValue.value;
              subQ += `${
                isProduct ? ' OR ' : ' '
              }packageProductQuantity2.comboId IN (:combos)`;
            }
            sub.andWhere(subQ, subValue);
            return 'packages.id IN ' + sub.getQuery();
          });
        }
        findOptions.filter.forEach(async (fil) => {
          if (fil.key === 'active') {
            packageQuery.andWhere('packages.isActive = :active', {
              active: fil.value,
            });
          }
        });
      }
      const data = await packageQuery.getManyAndCount();

      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
      };
    }
  }

  async getPackageById(id: number, storeList: Array<{ id: string }>) {
    const packageInfo = await this.packagesRepository.findOne({
      relations: {
        store: true,
        packageProductQuantity: {
          product: {
            image: true,
          },
          combo: {
            image: true,
          },
        },
        image: true,
      },
      where: {
        id,
      },
    });
    if (packageInfo) {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        packageInfo.store.id.toString(),
      );
      if (storeCheck) {
        return packageInfo;
      }
    } else {
      throw new NotFoundException('Package not found');
    }
  }

  async updatePackageInfo(
    data: UpdatePackageDto,
    storeList: Array<{ id: string }>,
  ) {
    const packageInfo = await this.packagesRepository.findOne({
      relations: {
        packageProductQuantity: {
          product: true,
          combo: true,
        },
        store: true,
        image: true,
      },
      where: {
        id: data.id,
      },
    });
    if (packageInfo) {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        packageInfo.store.id.toString(),
      );
      if (storeCheck) {
        // can not edit name and items in package
        const dataToUpdate = {
          name: data.name,
          description: data.description,
          timesCanUse: data.timesCanUse,
          commissionType: data.commissionType,
          expiryTime: data.expiryTime,
          image: data.image,
          price: data.price ? parseFloat(data.price) : 0,
          commissionRate: data.commissionRate
            ? parseFloat(data.commissionRate)
            : null,
          originalPrice: data.originalPrice
            ? parseFloat(data.originalPrice)
            : 0,
        };
        const newPackage = {
          ...packageInfo,
          ...dataToUpdate,
        };

        if (!newPackage.image || !newPackage.image.id) {
          newPackage.image = null;
        }
        await this.packagesRepository.save(newPackage);
        return newPackage;
      }
    } else {
      throw new NotFoundException('Package not found');
    }
  }

  async updatePackageStatus(id: number, storeList: Array<{ id: string }>) {
    const packageInfo = await this.packagesRepository.findOne({
      relations: {
        store: true,
      },
      where: {
        id,
      },
    });
    if (!packageInfo) {
      throw new NotFoundException('Packge not found');
    } else {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        packageInfo.store.id.toString(),
      );
      if (storeCheck) {
        const newPackage = {
          ...packageInfo,
          isActive: !packageInfo.isActive,
        };
        await this.packagesRepository.save(newPackage);
        return newPackage;
      }
    }
  }

  async deletePackage(id: number, storeList: Array<{ id: string }>) {
    const packageInfo = await this.packagesRepository.findOne({
      relations: {
        store: true,
      },
      where: {
        id,
      },
    });
    if (!packageInfo) {
      throw new NotFoundException('Package not found');
    } else {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        packageInfo.store.id.toString(),
      );
      if (storeCheck) {
        await this.packagesRepository.softRemove(packageInfo);
        return true;
      }
    }
  }
}
