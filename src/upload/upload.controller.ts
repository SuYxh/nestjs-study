import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import type { Response } from 'express';
import { zip } from 'compressing';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file);
    return {
      url: `http://127.0.0.1:3000/public/${file.filename}`,
    };
  }

  @Get('export')
  downLoad(@Res() res: Response) {
    const url = join(__dirname, '../images/1716123154855.png');
    // console.log(url)
    res.download(url);
  }

  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1716124808949.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);

    res.setHeader('Content-Type', 'application/octet-stream');

    res.setHeader('Content-Disposition', `attachment; filename=xiaoman`);

    tarStream.pipe(res);
  }
}
