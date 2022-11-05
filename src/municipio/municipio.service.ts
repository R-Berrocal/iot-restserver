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
    const departamento = await this.departamentoService.departamentoIdExiste(
      id,
    );
    if (!departamento) {
      return new HttpException(
        `No existe un departamento con id  ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    const munExiste = await this.municipioExiste(newMunicipio.nombre);
    if (munExiste) {
      return munExiste;
    }
    const municipio = this.municipioRepository.create(newMunicipio);
    municipio.departamento = departamento;
    return await this.municipioRepository.save(municipio);
  }

  findAllMunicipio() {
    return this.municipioRepository.find({ relations: { departamento: true } });
  }

  async findOneMunicipio(id: number) {
    const municipio = await this.municipioRepository.findOne({
      where: {
        idMunicipio: id,
      },
      relations: {
        departamento: true,
      },
    });
    if (!municipio) {
      return new HttpException(
        `No existe el municipio con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return municipio;
  }

  async updateMunicipio(id: number, updateMunicipio: UpdateMunicipioDto) {
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
      return new HttpException(
        `ya existe el Municipio ${nombre}`,
        HttpStatus.CONFLICT,
      );
    }
    return null;
  }
  async municipioIdExiste(id: number) {
    const mun = await this.municipioRepository.findOne({
      where: {
        idMunicipio: id,
      },
    });
    if (!mun) {
      return null;
    }
    return mun;
  }
}
