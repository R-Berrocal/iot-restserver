import { Module } from '@nestjs/common';
import { VeredaService } from './vereda.service';
import { VeredaController } from './vereda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vereda } from './entities/vereda.entity';
import { MunicipioModule } from 'src/municipio/municipio.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vereda]), MunicipioModule],
  controllers: [VeredaController],
  providers: [VeredaService],
})
export class VeredaModule {}
