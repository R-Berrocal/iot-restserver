import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CultivoService } from './cultivo.service';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { UpdateCultivoDto } from './dto/update-cultivo.dto';

@Controller('cultivo')
export class CultivoController {
  constructor(private readonly cultivoService: CultivoService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':idVereda/vereda')
  create(
    @Param('idVereda', ParseIntPipe) idVereda: number,
    @Body()
    newCultivo: CreateCultivoDto,
    @Request() req: any,
  ) {
    return this.cultivoService.create(
      req.user.idPequeñoProductor,
      idVereda,
      newCultivo,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    return await this.cultivoService.findAll(req.user.idPequeñoProductor);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const { pequeño_productor, ...cultivo } = await this.cultivoService.findOne(
      id,
      req.user.idPequeñoProductor,
    );
    return cultivo;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) idCultivo: number,
    @Body() updateCultivo: UpdateCultivoDto,
    @Request() req: any,
  ) {
    return this.cultivoService.update(
      idCultivo,
      updateCultivo,
      req.user.idPequeñoProductor,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) idCultivo: number, @Request() req: any) {
    return this.cultivoService.remove(idCultivo, req.user.idPequeñoProductor);
  }
}
