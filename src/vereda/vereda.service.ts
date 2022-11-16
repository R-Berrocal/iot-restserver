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
    await this.veredaExiste(newVereda.nombre);
    const municipio = await this.municipioService.findOneMunicipio(id);
    const vereda = this.veredaRepository.create(newVereda);
    vereda.municipio = municipio;
    return await this.veredaRepository.save(vereda);
  }

  findAllVereda() {
    return this.veredaRepository.find({
      relations: ['municipio'],
    });
  }

  async findOneVereda(id: number) {
    const vereda = await this.veredaRepository.findOne({
      where: {
        idVereda: id,
      },
      relations: ['municipio'],
    });
    if (!vereda) {
      throw new HttpException(
        `No existe la vereda con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return vereda;
  }

  async updateVereda(id: number, updateVereda: UpdateVeredaDto) {
    await this.veredaExiste(updateVereda.nombre);
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
      throw new HttpException(
        `ya existe la vereda ${nombre}`,
        HttpStatus.CONFLICT,
      );
    }
  }
}
