import { Module } from '@nestjs/common';
import { InformeService } from './informe.service';
import { InformeController } from './informe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Informe } from './entities/informe.entity';
import { CultivoModule } from 'src/cultivo/cultivo.module';
import { IotModule } from 'src/iot/iot.module';

@Module({
  imports: [TypeOrmModule.forFeature([Informe]), CultivoModule, IotModule],
  controllers: [InformeController],
  providers: [InformeService],
})
export class InformeModule {}
