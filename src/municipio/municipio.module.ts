import { Module } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { MunicipioController } from './municipio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipio } from './entities/municipio.entity';
import { DepartamentoModule } from 'src/departamento/departamento.module';

@Module({
  imports: [TypeOrmModule.forFeature([Municipio]), DepartamentoModule],
  controllers: [MunicipioController],
  providers: [MunicipioService],
  exports: [MunicipioService],
})
export class MunicipioModule {}
