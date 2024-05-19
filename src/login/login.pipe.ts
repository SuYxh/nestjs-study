import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // console.log('value', value);
    // console.log('metadata', metadata);
    const DTO = plainToInstance(metadata.metatype, value);
    const errors = await validate(DTO);
    console.log(errors);
    if (errors?.length) {
      // 可以在这里处理一下 errors 让前端看起来更友好
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
