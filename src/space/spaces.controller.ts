import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  Res,
  Sse,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateSpaceDto,
  CreateSpaceUnitDto,
  UpdateSpaceDto,
  UpdateSpaceUnitDto,
  // UpdateUserPayloadDto,
  // ChangePasswordDto,
} from './dto/space.dto';
import { Response, Request } from 'express';
import { SpacesService } from './spaces.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { KeyValue, ROLE_LIST } from '../common/constant';
import { getFilterObject } from 'src/common/function';

@Controller('spaces')
@UseInterceptors(ClassSerializerInterceptor)
export class SpacesController {
  constructor(private readonly spaceService: SpacesService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/group')
  @UseGuards(AuthGuard('jwt'))
  async addSpaceGroup(
    @Body() createSpaceData: CreateSpaceDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const space = await this.spaceService.addNewSpaceByOwner(
      createSpaceData,
      user,
    );
    res.status(HttpStatus.OK).json({ data: space });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/group/all/:storeId')
  @UseGuards(AuthGuard('jwt'))
  async listAllSpaceGroup(
    @Param() params: KeyValue,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const space = await this.spaceService.listAllSpaceGroup(
      user,
      params.storeId,
    );
    res.status(HttpStatus.OK).json({ data: space });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Patch('/group/:storeId/:id')
  @UseGuards(AuthGuard('jwt'))
  async patchSpaceGroup(
    @Param() params: KeyValue,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const space = await this.spaceService.changeSpaceGroupStatus(params, user);
    res.status(HttpStatus.OK).json({ data: space });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Put('/group/:storeId/:id')
  @UseGuards(AuthGuard('jwt'))
  async editSpaceGroup(
    @Param() params: KeyValue,
    @Body() editSpaceGroup: UpdateSpaceDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const space = await this.spaceService.editSpaceGroup(
      params,
      user,
      editSpaceGroup,
    );
    res.status(HttpStatus.OK).json({ data: space });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/group/:storeId/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteSpaceGroup(
    @Param() params: KeyValue,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const space = await this.spaceService.deleteSpaceGroup(params, user);
    res.status(HttpStatus.OK).json({ data: space });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/unit/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteSpaceUnit(
    @Param() params: KeyValue,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const space = await this.spaceService.deleteSpaceUnit(params, user);
    res.status(HttpStatus.OK).json({ data: space });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/unit')
  @UseGuards(AuthGuard('jwt'))
  async addSpaceUnit(
    @Body() createSpaceData: CreateSpaceUnitDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const space = await this.spaceService.addNewSpaceUnit(
      createSpaceData,
      user,
    );
    res.status(HttpStatus.OK).json({ data: space });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/group')
  @UseGuards(AuthGuard('jwt'))
  async listSpaceGroup(@Req() req: Request, @Res() res: Response) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const filterOption = getFilterObject(req);
    const spaces = await this.spaceService.getSpaceListFilter(
      req.query['storeId'].toString(),
      user.storeList,
      filterOption,
    );
    res.status(HttpStatus.OK).json({ data: spaces });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/unit')
  @UseGuards(AuthGuard('jwt'))
  async listSpaceUnit(@Req() req: Request, @Res() res: Response) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const filterOption = getFilterObject(req);
    const spaces = await this.spaceService.getSpaceUnitListFilter(
      req.query['storeId'].toString(),
      user.storeList,
      filterOption,
    );
    res.status(HttpStatus.OK).json({ data: spaces });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Put('/unit/:id')
  @UseGuards(AuthGuard('jwt'))
  async editSpaceUnit(
    @Param() params: KeyValue,
    @Body() editSpaceGroup: UpdateSpaceUnitDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const space = await this.spaceService.editSpaceUnit(
      params,
      user,
      editSpaceGroup,
    );
    res.status(HttpStatus.OK).json({ data: space });
  }
}
