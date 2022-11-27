import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GastoService } from './gasto.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('gasto')
export class GastoController {
  constructor(private readonly gastoService: GastoService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':idCultivo/cultivo')
  create(
    @Param('idCultivo', ParseIntPipe) idCultivo: number,
    @Body()
    newGastoDto: CreateGastoDto[],
    @Request() req: any,
  ) {
    return this.gastoService.create(
      idCultivo,
      req.user.idPequeñoProductor,
      newGastoDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':idCultivo/cultivo')
  findAll(
    @Param('idCultivo', ParseIntPipe) idCultivo: number,
    @Request() req: any,
  ) {
    return this.gastoService.findAll(idCultivo, req.user.idPequeñoProductor);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gastoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGastoDto: UpdateGastoDto) {
    return this.gastoService.update(+id, updateGastoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gastoService.remove(+id);
  }
}
