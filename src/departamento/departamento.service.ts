import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
  ) {}
  async createDepartamento(newDepartamento: CreateDepartamentoDto) {
    await this.departamentoExiste(newDepartamento.nombre);
    const departamento = this.departamentoRepository.create(newDepartamento);
    return await this.departamentoRepository.save(departamento);
  }

  findAllDepartamento() {
    return this.departamentoRepository.find({
      relations: ['municipios'],
    });
  }

  async findOneDepartamento(id: number) {
    const departamento = await this.departamentoRepository.findOne({
      where: {
        idDepartamento: id,
      },
      relations: ['municipios'],
    });
    if (!departamento) {
      throw new HttpException(
        `No existe el departamento con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return departamento;
  }

  async updateDepartamento(
    id: number,
    updateDepartamento: UpdateDepartamentoDto,
  ) {
    await this.departamentoExiste(updateDepartamento.nombre);
    await this.departamentoRepository.update(
      { idDepartamento: id },
      updateDepartamento,
    );
    return await this.findOneDepartamento(id);
  }

  async removeDepartamento(id: number) {
    const departamento = await this.findOneDepartamento(id);
    await this.departamentoRepository.delete({ idDepartamento: id });
    return departamento;
  }

  async departamentoExiste(nombre: string) {
    const dep = await this.departamentoRepository.findOne({
      where: {
        nombre,
      },
    });
    if (dep) {
      throw new HttpException(
        `ya existe el departamento ${nombre}`,
        HttpStatus.CONFLICT,
      );
    }
  }
}
