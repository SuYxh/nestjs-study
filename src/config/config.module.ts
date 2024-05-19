import { Module, Global, DynamicModule } from '@nestjs/common';

@Global()
// 静态模块，静态模块，直接导出一个空的 class 就行
// @Module({
//   providers: [
//     {
//       provide: 'Config',
//       useValue: { baseUrl: '/api' },
//     },
//   ],
//   exports: [
//     {
//       provide: 'Config',
//       useValue: { baseUrl: '/api' },
//     },
//   ],
// })
@Module({})
export class ConfigModule {
  // 动态模块，定义一个 forRoot 的静态方法
  static forRoot(options: any): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseUrl: '/api', path: options.path },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseUrl: '/api' },
        },
      ],
    };
  }
}
