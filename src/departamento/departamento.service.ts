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
    const dep = await this.departamentoExiste(newDepartamento.nombre);
    if (dep) {
      return dep;
    }
    const departamento = this.departamentoRepository.create(newDepartamento);
    return await this.departamentoRepository.save(departamento);
  }

  findAllDepartamento() {
    return this.departamentoRepository.find();
  }

  async findOneDepartamento(id: number) {
    const departamento = await this.departamentoRepository.findOne({
      where: {
        idDepartamento: id,
      },
    });
    if (!departamento) {
      return new HttpException(
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
      return new HttpException(
        `ya existe el departamento ${nombre}`,
        HttpStatus.CONFLICT,
      );
    }
    return null;
  }
}
