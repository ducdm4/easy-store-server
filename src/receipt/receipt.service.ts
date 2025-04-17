import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { SearchInterface } from 'src/common/interface/search.interface';
import { ReceiptEntity } from 'src/typeorm/entities/receipt.entity';
import { ReceiptProductToppingEntity } from 'src/typeorm/entities/receiptProductTopping.entity';
import { ProductEntity } from 'src/typeorm/entities/product.entity';
import { ComboEntity } from 'src/typeorm/entities/combo.entity';
import { PackagesEntity } from 'src/typeorm/entities/package.entity';
import { CreateReceiptDto } from './dto/receipt.dto';
import { KeyValue, RECEIPT_STATUS, RECEIPT_TYPE } from 'src/common/constant';
import * as moment from 'moment';
import { ReceiptProductEntity } from 'src/typeorm/entities/receiptProduct.entity';

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
    private storesService: StoresService,
  ) {}

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
        let typeText = 'TA';
        if (data.type === RECEIPT_TYPE.DINE_IN) typeText = 'DI';
        const code = `${typeText}-${moment(new Date()).format(
          'YYYYMMDDHHMMSS',
        )}-${data.storeId}`;
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
        newReceipt = await queryRunner.manager.save(newReceipt);
        returnData = {
          ...newReceipt,
          receiptProducts: [],
        };
        if (data.receiptProducts.length > 0) {
          returnData.receiptProducts = [];
          for (const item of data.receiptProducts) {
            const receiptProduct = this.receiptProductRepository.create();

            receiptProduct.receipt = newReceipt;
            receiptProduct.product = item.product
              ? this.productRepository.create({ id: item.product.id })
              : null;
            receiptProduct.combo = item.combo
              ? this.comboRepository.create({ id: item.combo.id })
              : null;
            receiptProduct.package = item.package
              ? this.packageRepository.create({ id: item.package.id })
              : null;
            receiptProduct.quantity = item.quantity;
            receiptProduct.price = item.price | 0;
            receiptProduct.priceDiscounted = item.priceDiscounted | 0;
            receiptProduct.note = item.note;
            receiptProduct.groupNumber = item.groupNumber;

            const newReceiptProduct = await queryRunner.manager.save(
              receiptProduct,
            );
            const toppingToAdd = item.topping.map((top) => {
              return this.receiptProductToppingRepository.create({
                product: this.productRepository.create({
                  id: top.id,
                }),
                quantity: Number(top.quantity),
                price: item.price | 0,
                priceDiscounted: item.priceDiscounted | 0,
                receiptProduct: newReceiptProduct,
              });
            });
            const toppingAdded = await queryRunner.manager.save(toppingToAdd);
            const receiptProductToAdd = {
              ...newReceiptProduct,
            };
            delete receiptProductToAdd.receipt;
            returnData.receiptProducts.push({
              ...receiptProductToAdd,
              topping: toppingAdded.map((top) => {
                const returnItem = top;
                delete returnItem.receiptProduct;
                return returnItem;
              }),
            });
          }
        }
        await queryRunner.commitTransaction();
        return returnData;
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Something went wrong');
      } finally {
        await queryRunner.release();
      }
    }

    return false;
  }
}
