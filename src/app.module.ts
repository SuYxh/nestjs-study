import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    ListModule,
    UsersModule,
    ConfigModule.forRoot({ path: '/list' }),
    UploadModule,
    LoginModule,
    GuardModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql.sqlpub.com',
      port: 3306,
      username: 'ironblog',
      password: '1706c42132d4b134',
      database: 'ironblog',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService2,
    {
      provide: 'aaa',
      useClass: AppService,
    },
    {
      provide: 'Bbb',
      useValue: ['2', '3'],
    },
    {
      provide: 'Ccc',
      inject: [AppService2],
      async useFactory(appService2: AppService2) {
        return new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve(appService2.getHello());
          }, 20);
        });
      },
    },
  ],
})
export class AppModule {}
