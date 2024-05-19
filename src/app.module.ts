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

@Module({
  imports: [
    UserModule,
    ListModule,
    UsersModule,
    ConfigModule.forRoot({ path: '/list' }),
    UploadModule,
    LoginModule,
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
