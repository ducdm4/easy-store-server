import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  Sse,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateStoreDto,
  // UpdateUserPayloadDto,
  // ChangePasswordDto,
} from './dto/store.dto';
import { Response, Request } from 'express';
import { StoresService } from './stores.service';
// import { UsersPipe } from './pipes/users.pipe';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ROLE_LIST } from '../common/constant';

@Controller('stores')
@UseInterceptors(ClassSerializerInterceptor)
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async registerStore(
    @Body() createStoreData: CreateStoreDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as { id: number };
    if (!createStoreData.logoPicture.id) delete createStoreData.logoPicture;
    const store = await this.storeService.addNewStoreByOwner(
      createStoreData,
      user,
    );
    res.status(HttpStatus.OK).json({ data: store });
  }
}
