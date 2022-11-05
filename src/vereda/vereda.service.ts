import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MunicipioService } from 'src/municipio/municipio.service';
import { Repository } from 'typeorm';
import { CreateVeredaDto } from './dto/create-vereda.dto';
import { UpdateVeredaDto } from './dto/update-vereda.dto';
import { Vereda } from './entities/vereda.entity';

@Injectable()
export class VeredaService {
  constructor(
    @InjectRepository(Vereda)
    private veredaRepository: Repository<Vereda>,
    private municipioService: MunicipioService,
  ) {}
  async createVereda(id: number, newVereda: CreateVeredaDto) {
    const municipio = await this.municipioService.municipioIdExiste(id);
    if (!municipio) {
      return new HttpException(
        `No existe un municipio con id  ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    const verExiste = await this.veredaExiste(newVereda.nombre);
    if (verExiste) {
      return verExiste;
    }
    const vereda = this.veredaRepository.create(newVereda);
    vereda.municipio = municipio;
    return await this.veredaRepository.save(vereda);
  }

  findAllVereda() {
    return this.veredaRepository.find({
      relations: ['municipio', 'municipio.departamento'],
    });
  }

  async findOneVereda(id: number) {
    const vereda = await this.veredaRepository.findOne({
      where: {
        idVereda: id,
      },
      relations: ['municipio', 'municipio.departamento'],
    });
    if (!vereda) {
      return new HttpException(
        `No existe la vereda con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return vereda;
  }

  async updateVereda(id: number, updateVereda: UpdateVeredaDto) {
    await this.veredaRepository.update({ idVereda: id }, updateVereda);
    return await this.findOneVereda(id);
  }

  async removeVereda(id: number) {
    const vereda = await this.findOneVereda(id);
    await this.veredaRepository.delete({ idVereda: id });
    return vereda;
  }

  async veredaExiste(nombre: string) {
    const ver = await this.veredaRepository.findOne({
      where: {
        nombre,
      },
    });
    if (ver) {
      return new HttpException(
        `ya existe la vereda ${nombre}`,
        HttpStatus.CONFLICT,
      );
    }
    return null;
  }
}
