import {
    Controller,
    Get,
    Param,
    UseInterceptors,
    ClassSerializerInterceptor,
    StreamableFile,
    Res,
    ParseIntPipe,
  } from '@nestjs/common';
  import { UploadsService } from './uploads.service';
  import { Response } from 'express';
  import { createReadStream } from 'fs';
  import { join } from 'path';
   

@Controller("uploads")
export class UploadsController {
    constructor(private readonly uploadService: UploadsService) {}

        @Get(':id')
  async getDatabaseFileById(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) response: Response) {
    const file = await this.uploadService.getOneFileById(id);
 
    const stream = createReadStream(join(process.cwd(), file.path));
 
    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype
    })
    return new StreamableFile(stream);
  }
}