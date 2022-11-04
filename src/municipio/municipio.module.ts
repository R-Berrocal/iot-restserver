import { Module } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { MunicipioController } from './municipio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipio } from './entities/municipio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Municipio])],
  controllers: [MunicipioController],
  providers: [MunicipioService],
})
export class MunicipioModule {}
