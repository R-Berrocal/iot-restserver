import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { Municipio } from './entities/municipio.entity';

@Controller('Municipio')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Post(':id/departamento')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() newMunicipio: CreateMunicipioDto,
  ): Promise<Municipio> {
    return this.municipioService.createMunicipio(id, newMunicipio);
  }

  @Get()
  findAll(): Promise<Municipio[]> {
    return this.municipioService.findAllMunicipio();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Municipio> {
    return this.municipioService.findOneMunicipio(+id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMunicipioDto: UpdateMunicipioDto,
  ): Promise<Municipio> {
    return this.municipioService.updateMunicipio(+id, updateMunicipioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Municipio> {
    return this.municipioService.removeMunicipio(+id);
  }
}
