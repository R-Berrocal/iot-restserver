import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PequeñosProductoresMiddleware } from './middlewares/pequeños_productores.middleware';
import { PequeñosProductoresController } from './pequeños_productores/pequeños_productores.controller';
import { PequeñosProductoresModule } from './pequeños_productores/pequeños_productores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PequeñosProductoresModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PequeñosProductoresMiddleware)
      .exclude(
        { path: 'pequenos-productores', method: RequestMethod.GET },
        { path: 'pequenos-productores', method: RequestMethod.POST },
      )
      .forRoutes(PequeñosProductoresController);
  }
}
