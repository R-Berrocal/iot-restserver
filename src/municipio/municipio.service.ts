import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { Municipio } from './entities/municipio.entity';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private MunicipioRepository: Repository<Municipio>,
  ) {}
  async createMunicipio(newMunicipio: CreateMunicipioDto) {
    const mun = await this.MunicipioExiste(newMunicipio.nombre);
    if (mun) {
      return mun;
    }
    const municipio = this.MunicipioRepository.create(newMunicipio);
    return await this.MunicipioRepository.save(municipio);
  }

  findAllMunicipio() {
    return this.MunicipioRepository.find();
  }

  async findOneMunicipio(id: number) {
    const municipio = await this.MunicipioRepository.findOne({
      where: {
        idMunicipio: id,
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
    await this.MunicipioRepository.update({ idMunicipio: id }, updateMunicipio);
    return await this.findOneMunicipio(id);
  }

  async removeMunicipio(id: number) {
    const municipio = await this.findOneMunicipio(id);
    await this.MunicipioRepository.delete({ idMunicipio: id });
    return municipio;
  }

  async MunicipioExiste(nombre: string) {
    const mun = await this.MunicipioRepository.findOne({
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
}
