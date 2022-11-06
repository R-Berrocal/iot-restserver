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
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Controller('departamento')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Post()
  create(
    @Body() newDepartamento: CreateDepartamentoDto,
  ): Promise<Departamento> {
    return this.departamentoService.createDepartamento(newDepartamento);
  }

  @Get()
  findAll(): Promise<Departamento[]> {
    return this.departamentoService.findAllDepartamento();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Departamento> {
    return this.departamentoService.findOneDepartamento(+id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartamentoDto: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    return this.departamentoService.updateDepartamento(
      +id,
      updateDepartamentoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Departamento> {
    return this.departamentoService.removeDepartamento(+id);
  }
}
