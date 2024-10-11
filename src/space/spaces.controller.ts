import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateSpaceDto,
  CreateSpaceUnitDto,
  UpdateSpaceDto,
  UpdateSpaceUnitDto,
} from './dto/space.dto';
import { Response, Request } from 'express';
import { SpacesService } from './spaces.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { KeyValue, ROLE_LIST } from '../common/constant';
import { getFilterObject } from 'src/common/function';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';

@Controller('spaces')
@UseInterceptors(ClassSerializerInterceptor)
export class SpacesController {
  constructor(private readonly spaceService: SpacesService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/group')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async addSpaceGroup(
    @Body() createSpaceData: CreateSpaceDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const space = await this.spaceService.addNewSpaceByOwner(
        createSpaceData,
        user,
      );
      res.status(HttpStatus.OK).json({ data: space });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/group/all/:storeId')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async listAllSpaceGroup(
    @Param() params: KeyValue,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const space = await this.spaceService.listAllSpaceGroup(
        user,
        params.storeId,
      );
      res.status(HttpStatus.OK).json({ data: space });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Patch('/group/:storeId/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async patchSpaceGroup(
    @Param() params: KeyValue,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const space = await this.spaceService.changeSpaceGroupStatus(
        params,
        user,
      );
      res.status(HttpStatus.OK).json({ data: space });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Put('/group/:storeId/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async editSpaceGroup(
    @Param() params: KeyValue,
    @Body() editSpaceGroup: UpdateSpaceDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const space = await this.spaceService.editSpaceGroup(
        params,
        user,
        editSpaceGroup,
      );
      res.status(HttpStatus.OK).json({ data: space });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/group/:storeId/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async deleteSpaceGroup(
    @Param() params: KeyValue,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const space = await this.spaceService.deleteSpaceGroup(params, user);
      res.status(HttpStatus.OK).json({ data: space });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/unit/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async deleteSpaceUnit(
    @Param() params: KeyValue,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const space = await this.spaceService.deleteSpaceUnit(params, user);
      res.status(HttpStatus.OK).json({ data: space });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/unit')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async addSpaceUnit(
    @Body() createSpaceData: CreateSpaceUnitDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const space = await this.spaceService.addNewSpaceUnit(
        createSpaceData,
        user,
      );
      res.status(HttpStatus.OK).json({ data: space });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/group')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async listSpaceGroup(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const filterOption = getFilterObject(req);
      const spaces = await this.spaceService.getSpaceListFilter(
        req.query['storeId'].toString(),
        user.storeList,
        filterOption,
      );
      res.status(HttpStatus.OK).json({ data: spaces });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/unit')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async listSpaceUnit(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const filterOption = getFilterObject(req);
      const spaces = await this.spaceService.getSpaceUnitListFilter(
        req.query['storeId'].toString(),
        user.storeList,
        filterOption,
      );
      res.status(HttpStatus.OK).json({ data: spaces });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Put('/unit/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async editSpaceUnit(
    @Param() params: KeyValue,
    @Body() editSpaceGroup: UpdateSpaceUnitDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const space = await this.spaceService.editSpaceUnit(
        params,
        user,
        editSpaceGroup,
      );
      res.status(HttpStatus.OK).json({ data: space });
    } catch (e) {
      throw e;
    }
  }
}
