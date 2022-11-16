import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentoService } from 'src/departamento/departamento.service';
import { Repository } from 'typeorm';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { Municipio } from './entities/municipio.entity';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private municipioRepository: Repository<Municipio>,
    private departamentoService: DepartamentoService,
  ) {}
  async createMunicipio(id: number, newMunicipio: CreateMunicipioDto) {
    await this.municipioExiste(newMunicipio.nombre);
    const departamento = await this.departamentoService.findOneDepartamento(id);
    const municipio = this.municipioRepository.create(newMunicipio);
    municipio.departamento = departamento;
    return await this.municipioRepository.save(municipio);
  }

  findAllMunicipio() {
    return this.municipioRepository.find({
      relations: { departamento: true, veredas: true },
    });
  }

  async findOneMunicipio(id: number) {
    const municipio = await this.municipioRepository.findOne({
      where: {
        idMunicipio: id,
      },
      relations: {
        departamento: true,
        veredas: true,
      },
    });
    if (!municipio) {
      throw new HttpException(
        `No existe el municipio con id ${id} en la bd`,
        HttpStatus.NOT_FOUND,
      );
    }
    return municipio;
  }

  async updateMunicipio(id: number, updateMunicipio: UpdateMunicipioDto) {
    await this.municipioExiste(updateMunicipio.nombre);
    await this.municipioRepository.update({ idMunicipio: id }, updateMunicipio);
    return await this.findOneMunicipio(id);
  }

  async removeMunicipio(id: number) {
    const municipio = await this.findOneMunicipio(id);
    await this.municipioRepository.delete({ idMunicipio: id });
    return municipio;
  }

  async municipioExiste(nombre: string) {
    const mun = await this.municipioRepository.findOne({
      where: {
        nombre,
      },
    });
    if (mun) {
      throw new HttpException(
        `ya existe el Municipio ${nombre}`,
        HttpStatus.CONFLICT,
      );
    }
  }
}
