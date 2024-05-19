import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
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
