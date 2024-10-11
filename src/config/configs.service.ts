import { Inject, Injectable } from '@nestjs/common';
import { StoresService } from 'src/store/stores.service';
import { ConfigEntity } from 'src/typeorm/entities/config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigsService {
  constructor(
    @Inject('CONFIG_REPOSITORY')
    private configRepository: Repository<ConfigEntity>,
    private storeService: StoresService,
  ) {}

  async updateValueByKey(name: string, value: string, storeId: number) {
    const config = await this.configRepository.findOne({
      where: {
        name,
        store: { id: storeId },
      },
    });
    let res;
    if (!config) {
      res = this.configRepository.create({
        name,
        value,
        store: { id: storeId },
      });
      await this.configRepository.save(res);
    } else {
      config.value = value;
      await this.configRepository.save(config);
    }

    return res;
  }

  async getValueByKey(
    name: string,
    needCheck = true,
    storeId?: number,
    storeList?: Array<{ id: string }>,
  ) {
    let check = !needCheck;
    if (needCheck) {
      check = await this.storeService.checkStoreOwner(
        storeList,
        storeId.toString(),
      );
    }

    if (check) {
      const res = await this.configRepository.findOne({
        where: {
          name,
          store: { id: storeId },
        },
      });
      return res;
    }
    return '';
  }
}
