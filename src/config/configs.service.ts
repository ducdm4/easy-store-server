import { Inject, Injectable } from '@nestjs/common';
import { ConfigEntity } from 'src/typeorm/entities/config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigsService {
  constructor(
    @Inject('CONFIG_REPOSITORY')
    private configRepository: Repository<ConfigEntity>,
  ) {}

  async updateValueByKey(name: string, value: string, storeId: number) {
    const res = await this.configRepository.upsert(
      [{ name, value, store: { id: storeId } }],
      ['name', 'storeId'],
    );
    return res;
  }

  async getValueByKey(name: string, storeId: number) {
    const res = await this.configRepository.findOne({
      where: {
        name,
        store: { id: storeId },
      },
    });
    return res;
  }
}
