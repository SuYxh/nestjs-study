import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerMiddleware } from 'src/middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  // 添加中间件
  configure(consumer: MiddlewareConsumer) {
    // 写法 1
    // consumer.apply(LoggerMiddleware).forRoutes('users');
    // 写法 2
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'users',
      method: RequestMethod.GET,
    });
    // 写法 3
    // consumer.apply(LoggerMiddleware).forRoutes(UsersController);
  }
}
