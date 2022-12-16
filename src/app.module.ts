import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PequeñoProductorModule } from './pequeño_productor/pequeño_productor.module';
import { AuthModule } from './auth/auth.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { MunicipioModule } from './municipio/municipio.module';
import { VeredaModule } from './vereda/vereda.module';
import { CultivoModule } from './cultivo/cultivo.module';
import { GastoModule } from './gasto/gasto.module';
import { IotModule } from './iot/iot.module';
import { InformeModule } from './informe/informe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
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
    PequeñoProductorModule,
    AuthModule,
    DepartamentoModule,
    MunicipioModule,
    VeredaModule,
    CultivoModule,
    GastoModule,
    IotModule,
    InformeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
