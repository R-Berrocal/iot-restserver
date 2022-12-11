import { Module } from '@nestjs/common';
import { IotService } from './iot.service';
import { IotController } from './iot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Iot } from './entities/iot.entity';
import { CultivoModule } from 'src/cultivo/cultivo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Iot]), CultivoModule],
  controllers: [IotController],
  providers: [IotService],
})
export class IotModule {}
