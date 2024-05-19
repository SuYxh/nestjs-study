import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('aaa') private readonly appService: AppService,
    @Inject('Bbb') private readonly bbb: string[],
    @Inject('Ccc') private readonly ccc: string,
  ) {}

  @Get()
  getHello(): string {
    // return this.ccc;
    // return this.bbb;
    return this.appService.getHello();
  }
}
