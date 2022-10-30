import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PequeñosProductoresService } from './pequeños_productores.service';
import { PequeñosProductoresController } from './pequeños_productores.controller';
import { PequeñosProductores } from './pequeños_productores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PequeñosProductores])],
  providers: [PequeñosProductoresService],
  controllers: [PequeñosProductoresController],
  exports: [PequeñosProductoresService],
})
export class PequeñosProductoresModule {}
