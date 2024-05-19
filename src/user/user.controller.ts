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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return this.userService.create(createUserDto);
  }

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
