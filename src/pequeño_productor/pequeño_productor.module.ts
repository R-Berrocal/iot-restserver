import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PequeñoProductorService } from './pequeño_productor.service';
import { PequeñoProductorController } from './pequeño_productor.controller';
import { PequeñoProductor } from './entities/pequeño_productor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PequeñoProductor])],
  providers: [PequeñoProductorService],
  controllers: [PequeñoProductorController],
  exports: [PequeñoProductorService],
})
export class PequeñoProductorModule {}
