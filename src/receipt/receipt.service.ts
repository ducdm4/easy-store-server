import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { In, Not, QueryRunner, Repository } from 'typeorm';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { SearchInterface } from 'src/common/interface/search.interface';
import { ReceiptEntity } from 'src/typeorm/entities/receipt.entity';
import { ReceiptProductToppingEntity } from 'src/typeorm/entities/receiptProductTopping.entity';
import { ProductEntity } from 'src/typeorm/entities/product.entity';
import { ComboEntity } from 'src/typeorm/entities/combo.entity';
import { PackagesEntity } from 'src/typeorm/entities/package.entity';
import {
  CreateReceiptDto,
  PackagePurchasedDto,
  PackagePurchasedUpdateDto,
  ReceiptProduct,
} from './dto/receipt.dto';
import { KeyValue, RECEIPT_STATUS, RECEIPT_TYPE } from 'src/common/constant';
import * as moment from 'moment';
import { ReceiptProductEntity } from 'src/typeorm/entities/receiptProduct.entity';
import { CustomerEntity } from 'src/typeorm/entities/customer.entity';
import { EmployeeInfoEntity } from 'src/typeorm/entities/employeeInfo.entity';
import { PackagePurchasedEntity } from 'src/typeorm/entities/packagePurchased.entity';
import { PackageTrackingEntity } from 'src/typeorm/entities/packageTracking.entity';

@Injectable()
export class ReceiptService {
  constructor(
    @Inject('RECEIPT_REPOSITORY')
    private receiptRepository: Repository<ReceiptEntity>,
    @Inject('RECEIPT_PRODUCT_REPOSITORY')
    private receiptProductRepository: Repository<ReceiptProductEntity>,
    @Inject('RECEIPT_PRODUCT_TOPPING_REPOSITORY')
    private receiptProductToppingRepository: Repository<ReceiptProductToppingEntity>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<ProductEntity>,
    @Inject('COMBO_REPOSITORY')
    private comboRepository: Repository<ComboEntity>,
    @Inject('PACKAGES_REPOSITORY')
    private packageRepository: Repository<PackagesEntity>,
    @Inject('PACKAGE_PURCHASED_REPOSITORY')
    private packagePurchasedRepository: Repository<PackagePurchasedEntity>,
    @Inject('PACKAGE_TRACKING_REPOSITORY')
    private packageTrackingRepository: Repository<PackageTrackingEntity>,
    private storesService: StoresService,
  ) {}

  async getListReceiptFiltered(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId,
    );
    if (storeCheck) {
      const receiptQuery = dataSource
        .createQueryBuilder()
        .select([
          'receipt.id',
          'receipt.code',
          'receipt.note',
          'receipt.subTotal',
          'receipt.total',
          'receipt.totalDiscountAmount',
          'receipt.extraDiscount',
          'receipt.status',
          'receipt.type',
          'receipt.pointRewarded',
          'receipt.createdAt',
        ])
        .from(ReceiptEntity, 'receipt')
        .leftJoinAndMapMany(
          'receipt.receiptProducts',
          ReceiptProductEntity,
          'receiptProducts',
          'receipt.id = receiptProducts.receiptId',
        ) // get receiptProducts list
        .leftJoinAndSelect('receipt.customer', 'customer') // get customer info
        .leftJoinAndSelect('customer.personalInfo', 'customerPersonalInfo') // get employee info
        .leftJoinAndSelect('receipt.createdBy', 'createdBy') // get employee info
        .leftJoinAndMapOne(
          'receiptProducts.product',
          ProductEntity,
          'receiptProductsProduct',
          'receiptProducts.productId = receiptProductsProduct.id',
        ) // get receipt products product info
        .leftJoinAndMapOne(
          'receiptProducts.combo',
          ComboEntity,
          'receiptProductsCombo',
          'receiptProducts.comboId = receiptProductsCombo.id',
        ) // get receipt products combo info
        .leftJoinAndMapOne(
          'receiptProducts.package',
          PackagesEntity,
          'receiptProductsPackage',
          'receiptProducts.packageId = receiptProductsPackage.id',
        ) // get receipt products package info
        .leftJoinAndMapMany(
          'receiptProducts.topping',
          ReceiptProductToppingEntity,
          'receiptProductsTopping',
          'receiptProducts.id = receiptProductsTopping.receiptProductId',
        ) // get receipt products topping info
        .leftJoinAndMapOne(
          'receiptProductsTopping.product',
          ProductEntity,
          'receiptProductsToppingProduct',
          'receiptProductsToppingProduct.id = receiptProductsTopping.productId',
        ) // get receipt products topping product info
        .where('receipt.storeId = :storeId', { storeId });
      if (findOptions.paging.page !== 0) {
        receiptQuery.skip(
          (findOptions.paging.page - 1) * findOptions.paging.size,
        );
        receiptQuery.take(findOptions.paging.size);
      }
      if (findOptions.sort.length) {
        findOptions.sort.forEach((sort) => {
          if (sort.key === 'code') {
            receiptQuery.orderBy('receipt.code', sort.value);
          } else if (sort.key === 'total') {
            receiptQuery.orderBy('receipt.total', sort.value);
          }
        });
      }
      if (findOptions.keyword) {
        receiptQuery.andWhere((qb) => {
          const subKeyword1 = qb
            .subQuery()
            .select('receipt3.id')
            .from(ReceiptEntity, 'receipt3')
            .where(
              'receipt3.code LIKE :keyword OR receipt3.note LIKE :keyword',
              {
                keyword: '%' + findOptions.keyword + '%',
              },
            )
            .getQuery();
          const result = `receipt.id IN ${subKeyword1}`;
          return result;
        });
      }
      if (findOptions.filter.length) {
        findOptions.filter.forEach(async (fil) => {
          if (fil.key === 'product') {
            receiptQuery.andWhere((qb) => {
              const sub = qb
                .subQuery()
                .select('receipt2.id')
                .from(ReceiptEntity, 'receipt2')
                .leftJoin(
                  ReceiptProductEntity,
                  'receiptProductQuantity2',
                  'receiptProductQuantity2.id = receipt2.productId',
                )
                .where('receipt2.storeId = :storeId', { storeId })
                .andWhere(
                  'receiptProductQuantity2.productId IN (:productUsed)',
                  {
                    productUsed: fil.value,
                  },
                )
                .getQuery();
              return 'receipt.id IN ' + sub;
            });
          }
          if (fil.key === 'status') {
            receiptQuery.andWhere('receipt.status = :status', {
              status: fil.value,
            });
          }
          if (fil.key === 'type') {
            receiptQuery.andWhere('receipt.type = :type', {
              type: fil.value,
            });
          }
        });
      }
      const data = await receiptQuery.getManyAndCount();
      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
      };
    }
  }

  async saveNewReceipt(
    data: CreateReceiptDto,
    storeList: Array<{ id: string }>,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      data.storeId.toString(),
    );
    if (storeCheck) {
      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      let returnData = {} as KeyValue;
      try {
        const code = !data.code
          ? `${moment(new Date()).format('YYMMDDHHmmssSSS')}-${data.storeId}`
          : data.code;
        let newReceipt = this.receiptRepository.create({
          store: { id: data.storeId },
          customer: data.customer ? { id: data.customer.id } : null,
          total: data.total,
          subTotal: data.subTotal,
          totalDiscountAmount: data.totalDiscountAmount,
          extraDiscount: data.extraDiscount,
          note: data.note,
          status: RECEIPT_STATUS.TEMPORARY_SAVE,
          code,
        });

        if (data.id) newReceipt.id = data.id;
        const currentReceipt = data.id
          ? await this.getReceiptByCode(data.code)
          : null;
        if (data.customer.id) {
          const currentCustomerReceipt = await queryRunner.manager.find(
            ReceiptEntity,
            {
              relations: {
                customer: true,
              },
              where: {
                customer: {
                  id: data.customer.id,
                },
                id: Not(data.id),
              },
            },
          );
          if (currentCustomerReceipt.length > 0) {
            throw new BadRequestException(
              'Customer already have another on going receipt',
            );
          }
        }
        newReceipt = await queryRunner.manager.save(newReceipt);
        returnData = {
          ...newReceipt,
          receiptProducts: [],
        };
        let currentReceiptProductIds = data.id
          ? currentReceipt.receiptProducts.map((item) => item.id)
          : [];

        if (data.receiptProducts.length > 0) {
          returnData.receiptProducts = [];
          // used to mark product or combo or package as been used
          const newPackagePurchasedInThisReceipt = [];
          const markUsedOfPackageUnPurchasedProduct = [];
          const markUsedOfAlreadyPurchasedPackage = [];
          // loop all receipt product
          for (const item of data.receiptProducts) {
            // handle if this item is a package
            if (!item.product && !item.combo && !item.id) {
              const packagePurchased = await this.createNewPackagePurchased(
                newReceipt,
                item.package,
                queryRunner,
              );
              newPackagePurchasedInThisReceipt.push(packagePurchased);
            }
            await this.handlePackagePurchased(
              item,
              newPackagePurchasedInThisReceipt,
              markUsedOfPackageUnPurchasedProduct,
              markUsedOfAlreadyPurchasedPackage,
            );
            const res = await this.handleSaveReceiptProduct(
              item,
              newReceipt,
              currentReceiptProductIds,
              queryRunner,
              newPackagePurchasedInThisReceipt,
            );
            returnData.receiptProducts.push(res.newItem);
            currentReceiptProductIds = res.currentReceiptProductIds;
          }
          // update record in packageTracking
          const packageTrackingToUpdate = [];
          for (const packageUsed of markUsedOfPackageUnPurchasedProduct) {
            const newPackageTracking = this.packageTrackingRepository.create({
              packagePurchased:
                newPackagePurchasedInThisReceipt[packageUsed.index],
              receipt: newReceipt,
              timesUsed: packageUsed.pkgPurchasedGrpNumList.length,
              usedAt: new Date(),
            });
            newPackagePurchasedInThisReceipt[packageUsed.index].timeCanUseLeft =
              newPackagePurchasedInThisReceipt[packageUsed.index]
                .timeCanUseLeft - packageUsed.pkgPurchasedGrpNumList.length;
            packageTrackingToUpdate.push(newPackageTracking);
          }
          await queryRunner.manager.save(newPackagePurchasedInThisReceipt);
          // handle all saved packagePurchased
          const allPackageTrackingInDB =
            await this.packageTrackingRepository.find({
              relations: ['packagePurchased', 'receipt'],
              where: {
                packagePurchased: {
                  customer: {
                    id: newReceipt.customer.id,
                  },
                },
              },
            });
          const allPackageTrackingInDBToCalculate =
            allPackageTrackingInDB.filter(
              (tracking) => tracking.receipt.id === newReceipt.id,
            );
          for (const packageUsed of markUsedOfAlreadyPurchasedPackage) {
            const packageTrackingIndex =
              allPackageTrackingInDBToCalculate.findIndex(
                (tracking) =>
                  tracking.packagePurchased.id ===
                    packageUsed.packagePurchased.id &&
                  tracking.receipt.id === newReceipt.id,
              );
            if (packageTrackingIndex > -1) {
              const packageTracking =
                allPackageTrackingInDBToCalculate[packageTrackingIndex];
              packageTracking.timesUsed =
                packageUsed.packagePurchasedGroupNumber.length;
              packageTrackingToUpdate.push(packageTracking);
              allPackageTrackingInDBToCalculate.splice(packageTrackingIndex, 1);
            } else {
              const newPackageTracking = this.packageTrackingRepository.create({
                packagePurchased: packageUsed.packagePurchased,
                receipt: newReceipt,
                timesUsed: packageUsed.packagePurchasedGroupNumber.length,
                usedAt: new Date(),
              });
              packageTrackingToUpdate.push(newPackageTracking);
            }
          }

          await queryRunner.manager.save(packageTrackingToUpdate);
          await queryRunner.manager.delete(PackageTrackingEntity, {
            id: In(allPackageTrackingInDBToCalculate.map((item) => item.id)),
          });
          if (newReceipt.customer?.id) {
            this.handleUpdateTimeCanUseLeft(
              newReceipt.customer.id,
              allPackageTrackingInDB,
            );
          }
        } else {
          // delete removed receipt product from DB
          if (currentReceiptProductIds.length > 0) {
            await queryRunner.manager.delete(ReceiptProductToppingEntity, {
              receiptProduct: {
                id: In(currentReceiptProductIds),
              },
            });
            await queryRunner.manager.delete(ReceiptProductEntity, {
              id: In(currentReceiptProductIds),
            });
          }
        }
        await queryRunner.commitTransaction();
        return this.getReceiptByCode(newReceipt.code);
      } catch (err) {
        console.log(err);
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
    }

    return false;
  }

  async handlePackagePurchased(
    item: ReceiptProduct,
    newPackagePurchasedInThisReceipt: Array<PackagePurchasedEntity>,
    markUsedOfPackageUnPurchasedProduct: Array<{
      index: number;
      pkgPurchasedGrpNumList: Array<number>;
    }>,
    markUsedOfAlreadyPurchasedPackage: Array<{
      packagePurchased: {
        id: number;
      };
      packagePurchasedGroupNumber: Array<number>;
    }>,
  ) {
    if (item.package && (item.product || item.combo)) {
      // in case this package is not saved yet
      if (!item.packagePurchased.id) {
        item.packagePurchased.id =
          newPackagePurchasedInThisReceipt[item.packagePurchased.index].id;
        // find if there is a packagePurchasedGroupNumber and index pair,
        // if no then add new item to track
        const index = markUsedOfPackageUnPurchasedProduct.findIndex(
          (itemSub) => item.packagePurchased.index === itemSub.index,
        );
        if (index === -1) {
          // for un-saved packagePurchased, we use the index to keep track of it
          markUsedOfPackageUnPurchasedProduct.push({
            index: item.packagePurchased.index,
            pkgPurchasedGrpNumList: [
              item.packagePurchased.packagePurchasedGroupNumber,
            ],
          });
        } else {
          // if yes then check the packagePurchasedGroupNumber to see if it is already in
          // if not then add
          const indexPurchaseNumber = markUsedOfPackageUnPurchasedProduct[
            index
          ].pkgPurchasedGrpNumList.indexOf(
            item.packagePurchased.packagePurchasedGroupNumber,
          );
          if (indexPurchaseNumber === -1) {
            markUsedOfPackageUnPurchasedProduct[
              index
            ].pkgPurchasedGrpNumList.push(
              item.packagePurchased.packagePurchasedGroupNumber,
            );
          }
        }
      } else {
        // in case this package is already saved then we will track it to update later
        const index = markUsedOfAlreadyPurchasedPackage.findIndex((itemSub) => {
          return itemSub.packagePurchased.id === item.packagePurchased.id;
        });
        // if not exist packagePurchased.id in markUsedOfAlreadyPurchasedPackage then
        // create a new record and add packagePurchasedGroupNumber
        if (index === -1) {
          markUsedOfAlreadyPurchasedPackage.push({
            packagePurchased: item.packagePurchased,
            packagePurchasedGroupNumber: [
              item.packagePurchased.packagePurchasedGroupNumber,
            ],
          });
        } else {
          // if already exist packagePurchased.id then check the packagePurchasedGroupNumber
          // if not exist current item.packagePurchased.packagePurchasedGroupNumber then push it
          // finally the time uses of this packagePurchased is the length of packagePurchasedGroupNumber
          const indexPurchaseNumber = markUsedOfAlreadyPurchasedPackage[
            index
          ].packagePurchasedGroupNumber.indexOf(
            item.packagePurchased.packagePurchasedGroupNumber,
          );
          if (indexPurchaseNumber === -1) {
            markUsedOfAlreadyPurchasedPackage[
              index
            ].packagePurchasedGroupNumber.push(
              item.packagePurchased.packagePurchasedGroupNumber,
            );
          }
        }
      }
    }
  }

  async handleUpdateTimeCanUseLeft(
    customerId: number,
    allTracking: PackageTrackingEntity[],
  ) {
    const allCustomerPurchased = await this.packagePurchasedRepository.find({
      where: {
        customer: {
          id: customerId,
        },
      },
    });
    for (const packagePurchasedItem of allCustomerPurchased) {
      const trackingList = allTracking.filter(
        (item) => item.packagePurchased.id === packagePurchasedItem.id,
      );
      const totalUse = trackingList.reduce(
        (total, item) => total + Number(item.timesUsed),
        0,
      );
      packagePurchasedItem.timeCanUseLeft =
        packagePurchasedItem.timeCanUseTotal - totalUse;
      await this.packagePurchasedRepository.save(packagePurchasedItem);
    }
  }

  async handleSaveReceiptProduct(
    item: ReceiptProduct,
    newReceipt: ReceiptEntity,
    currentReceiptProductIds: number[],
    queryRunner: QueryRunner,
    newPackagePurchasedInThisReceipt: PackagePurchasedEntity[],
  ) {
    // create new receipt product entity
    const packagePurchasedInfo = item.packagePurchased;
    if (packagePurchasedInfo) {
      if (!packagePurchasedInfo.id)
        packagePurchasedInfo.id =
          newPackagePurchasedInThisReceipt[packagePurchasedInfo.index].id;
    }
    const receiptProduct = this.receiptProductRepository.create({
      receipt: newReceipt,
      product: item.product
        ? this.productRepository.create({ id: item.product.id })
        : null,
      combo: item.combo
        ? this.comboRepository.create({ id: item.combo.id })
        : null,
      package: item.package
        ? this.packageRepository.create({ id: item.package.id })
        : null,
      packagePurchased: packagePurchasedInfo,
      quantity: item.quantity,
      price: item.price | 0,
      priceDiscounted: item.priceDiscounted | 0,
      note: item.note,
      groupNumber: item.groupNumber,
    });

    let currentToppingIds = [];
    if (item.id) {
      receiptProduct.id = item.id;
      const indexInCurrent = currentReceiptProductIds.indexOf(item.id);
      if (indexInCurrent > -1) {
        currentReceiptProductIds.splice(indexInCurrent, 1);
      }
      // if this product is already save then get list of topping belongs to it
      // to delete what has been removed
      currentToppingIds = await this.receiptProductToppingRepository.find({
        where: {
          receiptProduct: {
            id: item.id,
          },
        },
      });
    }
    const newReceiptProduct = await queryRunner.manager.save(receiptProduct);
    const toppingToAdd = item.topping.map((top) => {
      const res = this.receiptProductToppingRepository.create({
        product: this.productRepository.create({
          id: top.productId,
        }),
        isInCombo: top.isInCombo,
        quantity: Number(top.quantity),
        price: top.price | 0,
        priceDiscounted: top.priceDiscounted | 0,
        receiptProduct: newReceiptProduct,
      });
      if (top.id) {
        res.id = top.id;
        const indexInCurrent = currentToppingIds.findIndex(
          (x) => x.id === top.id,
        );
        if (indexInCurrent > -1) {
          currentToppingIds.splice(indexInCurrent, 1);
        }
      }
      return res;
    });
    // delete removed topping for current product from DB
    if (currentToppingIds.length > 0) {
      await queryRunner.manager.delete(
        ReceiptProductToppingEntity,
        currentToppingIds.map((item) => ({ id: item.id })),
      );
    }

    const toppingAdded = await queryRunner.manager.save(toppingToAdd);
    const receiptProductToAdd = {
      ...newReceiptProduct,
    };
    delete receiptProductToAdd.receipt;
    const newItem = {
      ...receiptProductToAdd,
      topping: toppingAdded.map((top) => {
        const returnItem = top;
        delete returnItem.receiptProduct;
        return returnItem;
      }),
    };
    return {
      newItem,
      currentReceiptProductIds,
    };
  }

  async createNewPackagePurchased(
    receipt: ReceiptEntity,
    packageUsed: {
      id: number;
      timesCanUse: number;
    },
    queryRunner: QueryRunner,
  ) {
    const packageInfo = await this.packageRepository.findOne({
      where: { id: packageUsed.id },
    });
    const validUntil = moment(new Date()).add(
      Number(packageInfo.expiryTime),
      'days',
    );
    const packagePurchased = this.packagePurchasedRepository.create({
      package: { id: packageInfo.id },
      receipt: { id: receipt.id },
      customer: receipt.customer ? { id: receipt.customer.id } : null,
      purchasedAt: new Date(),
      validUntil: validUntil.toDate(),
      timeCanUseLeft: packageInfo.timesCanUse,
      timeCanUseTotal: packageInfo.timesCanUse,
      store: { id: receipt.store.id },
    });
    return await queryRunner.manager.save(packagePurchased);
  }

  async getReceiptByCode(code: string) {
    const productSelect = {
      image: true,
      toppingCategory: true,
      category: true,
    };
    const comboQuantitySelect = {
      productUsed: {
        image: true,
        toppingCategory: true,
        category: true,
      },
      toppingQuantity: {
        product: productSelect,
      },
    };
    const commonIdNameSelect = {
      id: true,
      name: true,
    };
    const commonPriceAndCommission = {
      price: true,
      originalPrice: true,
      commissionRate: true,
      commissionType: true,
    };
    const productSelectProperty = {
      ...commonPriceAndCommission,
      ...commonIdNameSelect,
      category: commonIdNameSelect,
      unit: true,
      image: commonIdNameSelect,
      toppingCategory: {
        ...commonIdNameSelect,
        displayOrder: true,
        max: true,
      },
    };
    const comboQuantitySelectProperty = {
      id: true,
      productUsed: productSelectProperty,
      toppingQuantity: {
        product: productSelectProperty,
      },
    };
    const commonPersonalInfoSelect = {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
    };
    const receipt = await this.receiptRepository.findOne({
      select: {
        id: true,
        code: true,
        createdAt: true,
        total: true,
        totalDiscountAmount: true,
        subTotal: true,
        type: true,
        status: true,
        note: true,
        extraDiscount: true,
        customer: {
          id: true,
          personalInfo: commonPersonalInfoSelect,
        },
        createdBy: {
          id: true,
          personalInfo: commonPersonalInfoSelect,
        },
        receiptProducts: {
          id: true,
          groupNumber: true,
          note: true,
          price: true,
          priceDiscounted: true,
          quantity: true,
          product: productSelectProperty,
          combo: {
            ...commonPriceAndCommission,
            ...commonIdNameSelect,
            image: commonIdNameSelect,
            description: true,
            comboQuantity: comboQuantitySelectProperty,
          },
          package: {
            ...commonIdNameSelect,
            ...commonPriceAndCommission,
            image: commonIdNameSelect,
            packageProductQuantity: {
              id: true,
              quantity: true,
              product: productSelectProperty,
              combo: {
                ...commonIdNameSelect,
                image: commonIdNameSelect,
                comboQuantity: comboQuantitySelectProperty,
              },
            },
          },
          topping: {
            id: true,
            product: productSelectProperty,
            isInCombo: true,
            quantity: true,
            price: true,
            priceDiscounted: true,
          },
          packagePurchased: {
            id: true,
            package: {
              ...commonIdNameSelect,
            },
          },
        },
        store: commonIdNameSelect,
      },
      where: { code },
      relations: {
        store: true,
        customer: {
          personalInfo: true,
        },
        createdBy: true,
        receiptProducts: {
          product: productSelect,
          combo: {
            comboQuantity: comboQuantitySelect,
            image: true,
          },
          package: {
            image: true,
            packageProductQuantity: {
              product: productSelect,
              combo: {
                image: true,
                comboQuantity: comboQuantitySelect,
              },
            },
          },
          topping: {
            product: {
              image: true,
            },
          },
          packagePurchased: {
            package: {
              image: true,
            },
          },
        },
      },
    });
    if (receipt) {
      return receipt;
    } else {
      return null;
    }
  }

  async getReceiptByCodeAndStore(
    code: string,
    storeList: Array<{ id: string }>,
  ) {
    const receipt = await this.getReceiptByCode(code);
    if (receipt) {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        receipt.store.id.toString(),
      );
      if (storeCheck) {
        return {
          receipt,
        };
      } else {
        throw new NotFoundException('Receipt not found');
      }
    } else {
      throw new NotFoundException('Receipt not found');
    }
  }

  async deletePackagePurchased(
    receiptCode: string,
    packagePurchasedId: number,
    storeList: Array<{ id: string }>,
  ) {
    const receipt = await this.receiptRepository.findOne({
      select: {
        id: true,
        code: true,
        store: {
          id: true,
        },
      },
      where: {
        code: receiptCode,
      },
      relations: {
        store: true,
      },
    });
    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    } else {
      if (
        this.storesService.checkStoreOwner(
          storeList,
          receipt.store.id.toString(),
        )
      ) {
        const packagePurchased = await this.packagePurchasedRepository.findOne({
          where: {
            id: packagePurchasedId,
          },
        });
        if (!packagePurchased) {
          throw new NotFoundException('Package purchased not found');
        } else {
          const packageTracking = await this.packageTrackingRepository.find({
            relations: {
              packagePurchased: true,
            },
            where: {
              packagePurchased: {
                id: packagePurchasedId,
              },
            },
          });
          await this.packageTrackingRepository.delete({
            id: In(packageTracking.map((item) => item.id)),
          });
          await this.packagePurchasedRepository.delete({
            id: packagePurchasedId,
          });
          return true;
        }
      } else {
        throw new NotFoundException('Receipt not found');
      }
    }
  }
}
