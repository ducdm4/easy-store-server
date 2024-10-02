import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigsService } from './configs.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorator/roles.decorator';
import { ROLE_LIST } from 'src/common/constant';
import { UserLoggedInDto } from 'src/user/dto/user.dto';

@Controller('configs')
export class ConfigsController {
  constructor(private readonly configService: ConfigsService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async findAllByStore(
    @Query() data: { key: string; storeId: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as UserLoggedInDto;
    const config = await this.configService.getValueByKey(
      data.key,
      true,
      data.storeId,
      user.storeList,
    );

    res.status(HttpStatus.OK).json({ data: config });
  }
}
