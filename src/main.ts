import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { Response, Request, NextFunction } from 'express';
import * as cors from 'cors';
import { join } from 'path';
import { CustomResponse } from './common/response';
import { HttpFilter } from './common/filter';
// import { RoleGuard } from './guard/role.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// const whiteList = ['/list', '/users'];

// function middleWareAll(req: Request, res: Response, next: NextFunction) {
//   console.log(req.originalUrl, '我收全局的');

//   if (whiteList.includes(req.originalUrl)) {
//     next();
//   } else {
//     res.send('小黑子露出鸡脚了吧');
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());
  app.useGlobalInterceptors(new CustomResponse());
  app.useGlobalFilters(new HttpFilter());

  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/public',
  });
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

  // app.use(middleWareAll);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RoleGuard());

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('接口文档')
    .setDescription('描述，。。。')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
