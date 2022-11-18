import { Module } from '@nestjs/common';
import { CultivoService } from './cultivo.service';
import { CultivoController } from './cultivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cultivo } from './entities/cultivo.entity';
import { PequeñoProductorModule } from 'src/pequeño_productor/pequeño_productor.module';
import { VeredaModule } from 'src/vereda/vereda.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cultivo]),
    PequeñoProductorModule,
    VeredaModule,
  ],
  controllers: [CultivoController],
  providers: [CultivoService],
})
export class CultivoModule {}
