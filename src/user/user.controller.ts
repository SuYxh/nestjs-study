import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Request,
  Query,
  Headers,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    req.session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('create')
  createUser(@Req() req, @Body() body) {
    console.log(req.session.code, body);
    if (
      req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()
    ) {
      return {
        message: '验证码正确',
      };
    } else {
      return {
        message: '验证码错误',
      };
    }
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   console.log('createUserDto', createUserDto);
  //   return this.userService.create(createUserDto);
  // }

  // @Post()
  // create(@Request() req) {
  //   console.log('req', req.body);
  //   return this.userService.create(req.body);
  // }

  // @Get()
  // findAll(@Request() req) {
  //   console.log('findAll', req.query);
  //   return this.userService.findAll();
  // }

  @Get()
  findAll(@Query() query) {
    console.log('findAll-query', query);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers) {
    console.log('id', id);
    console.log('headers', headers);
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
