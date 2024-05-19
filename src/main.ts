import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Response, Request, NextFunction } from 'express';
import * as cors from 'cors';

const whiteList = ['/list', '/users'];

function middleWareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl, '我收全局的');

  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send('小黑子露出鸡脚了吧');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(
    session({
      secret: 'XiaoMan',
      name: 'xm.session',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );

  app.use(middleWareAll);

  await app.listen(3000);
}
bootstrap();
