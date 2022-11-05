import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { VeredaService } from './vereda.service';
import { CreateVeredaDto } from './dto/create-vereda.dto';
import { UpdateVeredaDto } from './dto/update-vereda.dto';
import { Vereda } from './entities/vereda.entity';

@Controller('Vereda')
export class VeredaController {
  constructor(private readonly veredaService: VeredaService) {}

  @Post(':id')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() newVereda: CreateVeredaDto,
  ): Promise<Vereda | HttpException> {
    return this.veredaService.createVereda(id, newVereda);
  }

  @Get()
  findAll(): Promise<Vereda[]> {
    return this.veredaService.findAllVereda();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Vereda | HttpException> {
    return this.veredaService.findOneVereda(+id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMunicipioDto: UpdateVeredaDto,
  ): Promise<Vereda | HttpException> {
    return this.veredaService.updateVereda(+id, updateMunicipioDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Vereda | HttpException> {
    return this.veredaService.removeVereda(+id);
  }
}
