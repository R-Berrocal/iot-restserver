import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PequeñoProductorService } from 'src/pequeño_productor/pequeño_productor.service';
import { VeredaService } from 'src/vereda/vereda.service';
import { Repository } from 'typeorm';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { UpdateCultivoDto } from './dto/update-cultivo.dto';
import { Cultivo } from './entities/cultivo.entity';

@Injectable()
export class CultivoService {
  constructor(
    @InjectRepository(Cultivo) private cultivoRepository: Repository<Cultivo>,
    private pequeñoProductorService: PequeñoProductorService,
    private veredaService: VeredaService,
  ) {}
  async create(
    idPequeñoProductor: number,
    idVereda: number,
    newCultivo: CreateCultivoDto,
  ) {
    const pequeño_productor =
      await this.pequeñoProductorService.getPequeñoProductor(
        idPequeñoProductor,
      );
    const vereda = await this.veredaService.findOneVereda(idVereda);

    const cultivo = this.cultivoRepository.create(newCultivo);
    cultivo.pequeño_productor = pequeño_productor;
    cultivo.vereda = vereda;

    return await this.cultivoRepository.save(cultivo);
  }

  async findAll(idPequeñoProductor: number): Promise<Cultivo> {
    const { cultivos } =
      await this.pequeñoProductorService.getPequeñoProductorCultivos(
        idPequeñoProductor,
      );
    return cultivos;
  }

  async findOne(
    idCultivo: number,
    idPequeñoProductor: number,
  ): Promise<Cultivo> {
    const cultivo = await this.cultivoRepository.findOne({
      where: {
        idCultivo,
      },
      relations: ['pequeño_productor', 'vereda', 'gastos'],
    });
    if (!cultivo) {
      throw new HttpException(
        'Cultivo no existe en la bd',
        HttpStatus.NOT_FOUND,
      );
    }
    if (idPequeñoProductor != cultivo.pequeño_productor.idPequeñoProductor) {
      throw new UnauthorizedException();
    }

    return cultivo;
  }

  async update(
    idCultivo: number,
    updateCultivo: UpdateCultivoDto,
    idPequeñoProductor: number,
  ) {
    let cultivo = await this.findOne(idCultivo, idPequeñoProductor);
    await this.cultivoRepository.update({ idCultivo }, updateCultivo);
    cultivo = await this.findOne(idCultivo, idPequeñoProductor);
    return cultivo;
  }

  async remove(idCultivo: number, idPequeñoProductor: number) {
    const cultivo = await this.findOne(idCultivo, idPequeñoProductor);
    await this.cultivoRepository.softDelete(idCultivo);
    return cultivo;
  }
}
