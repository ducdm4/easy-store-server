import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/store.dto';
import { Response, Request } from 'express';
import { StoresService } from './stores.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ROLE_LIST } from '../common/constant';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { RolesGuard } from 'src/common/guard/roles.guard';

@Controller('stores')
@UseInterceptors(ClassSerializerInterceptor)
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async registerStore(
    @Body() createStoreData: CreateStoreDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as { id: number };
      if (!createStoreData.logoPicture.id) delete createStoreData.logoPicture;
      const store = await this.storeService.addNewStoreByOwner(
        createStoreData,
        user,
      );
      res.status(HttpStatus.OK).json({ data: store });
    } catch (e) {
      throw e;
    }
  }
}
