import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

@Controller('personalInfo')
@UseInterceptors(ClassSerializerInterceptor)
export class PersonalInfoController {}
