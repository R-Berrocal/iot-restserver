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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CultivoService } from './cultivo.service';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { UpdateCultivoDto } from './dto/update-cultivo.dto';

@Controller('cultivo')
export class CultivoController {
  constructor(private readonly cultivoService: CultivoService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':idPequenoProductor/pequenoProductor/:idVereda/vereda')
  create(
    @Param('idPequenoProductor', ParseIntPipe) idPequeñoProductor: number,
    @Param('idVereda', ParseIntPipe) idVereda: number,
    @Body()
    newCultivo: CreateCultivoDto,
    @Request() req,
  ) {
    return this.cultivoService.create(
      idPequeñoProductor,
      req.user,
      idVereda,
      newCultivo,
    );
  }

  @Get()
  findAll() {
    return this.cultivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cultivoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCultivoDto: UpdateCultivoDto) {
    return this.cultivoService.update(+id, updateCultivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cultivoService.remove(+id);
  }
}
