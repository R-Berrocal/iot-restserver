import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InformeService } from './informe.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('informe')
export class InformeController {
  constructor(private readonly informeService: InformeService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':idCultivo/cultivo')
  create(@Param('idCultivo', ParseIntPipe) idCultivo: number, @Req() req: any) {
    return this.informeService.create(idCultivo, req.user.idPequeñoProductor);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':idCultivo/cultivo')
  findAll(
    @Param('idCultivo', ParseIntPipe) idCultivo: number,
    @Req() req: any,
  ) {
    return this.informeService.findAll(idCultivo, req.user.idPequeñoProductor);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.informeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.informeService.remove(id);
  }
}
