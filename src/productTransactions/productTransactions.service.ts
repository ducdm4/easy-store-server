import { Inject, Injectable } from '@nestjs/common';
import { StoresService } from 'src/store/stores.service';
import { ProductService } from 'src/product/product.service';
import { ProductTransactionsEntity } from 'src/typeorm/entities/productTransactions.entity';
import { Repository } from 'typeorm';
import { CreateTransactionsDto } from './productTransactions.dto';

@Injectable()
export class ProductTransactionsService {
  constructor(
    @Inject('PRODUCT_TRANSACTIONS_REPOSITORY')
    private transactionsRepository: Repository<ProductTransactionsEntity>,
    private storeService: StoresService,
    private productService: ProductService,
  ) {}

  async createNewTransaction(
    data: CreateTransactionsDto,
    storeList: Array<{ id: string }>,
  ) {
    const product = await this.productService.getSingleProductForChecking(
      data.product.id,
    );
    if (product) {
      const storeCheck = await this.storeService.checkStoreOwner(
        storeList,
        product.store.id.toString(),
      );
      if (storeCheck) {
        const dataToSave = {
          ...data,
          product: { id: data.product.id },
        };
        const transaction = await this.transactionsRepository.save(dataToSave);
        return transaction;
      }
      return '';
    }
    return false;
  }
}
