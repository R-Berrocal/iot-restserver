import { Module } from '@nestjs/common';
import { GastoService } from './gasto.service';
import { GastoController } from './gasto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gasto } from './entities/gasto.entity';
import { CultivoModule } from 'src/cultivo/cultivo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gasto]), CultivoModule],
  controllers: [GastoController],
  providers: [GastoService],
})
export class GastoModule {}
