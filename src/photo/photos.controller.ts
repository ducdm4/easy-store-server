import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PhotosService } from './photos.service';
import { ROLE_LIST } from '../common/constant';
import { Roles } from '../common/decorator/roles.decorator';
import { createReadStream, open } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const photoInfo = await this.photosService.getPhotoById(id);
    open(`upload/photo/${photoInfo.name}`, 'r', (err, fd) => {
      if (err) {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          data: {},
          message: `Photo ${photoInfo.name} has been deleted`,
        });
      }
    });
    const fileR = createReadStream(
      join(process.cwd(), `upload/photo/${photoInfo.name}`),
    );
    res.setHeader('Content-Type', photoInfo.mimeType);
    return new StreamableFile(fileR);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './upload/photo' }))
  createNewPhoto(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    if (file.path) {
      const response = this.photosService.createPhoto(file);
      response.then((photoData) => {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: { photoInfo: photoData },
        });
      });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
        message: 'unknown error',
      });
    }
  }

  @Delete(':id')
  @Roles([ROLE_LIST.ADMIN])
  deletePhotoInfo(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const response = this.photosService.deletePhoto(id);
    response.then(
      (data) => {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: {},
        });
      },
      (fail) => {
        res.status(fail.getStatus()).json({
          code: fail.getStatus(),
          message: 'Photo not found',
          data: {},
        });
      },
    );
  }
}
