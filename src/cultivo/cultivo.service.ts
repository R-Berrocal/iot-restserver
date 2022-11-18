import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    pequeñoProductor: any,
    idVereda: number,
    newCultivo: CreateCultivoDto,
  ) {
    const pequeño_productor =
      await this.pequeñoProductorService.getPequeñoProductor(
        idPequeñoProductor,
      );
    if (
      pequeño_productor.idPequeñoProductor !=
      pequeñoProductor.idPequeñoProductor
    ) {
      throw new UnauthorizedException();
    }
    const vereda = await this.veredaService.findOneVereda(idVereda);

    const cultivo = this.cultivoRepository.create(newCultivo);
    cultivo.pequeño_productor = pequeño_productor;
    cultivo.vereda = vereda;

    return await this.cultivoRepository.save(cultivo);
  }

  findAll() {
    return this.cultivoRepository.find({
      relations: ['pequeño_productor', 'vereda'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} cultivo`;
  }

  update(id: number, updateCultivoDto: UpdateCultivoDto) {
    return `This action updates a #${id} cultivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} cultivo`;
  }
}
