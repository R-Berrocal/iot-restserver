import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CultivoService } from 'src/cultivo/cultivo.service';
import { Repository } from 'typeorm';
import { CreateIotDto } from './dto/create-iot.dto';
import { Iot } from './entities/iot.entity';

@Injectable()
export class IotService {
  constructor(
    @InjectRepository(Iot) private iotRepository: Repository<Iot>,
    private cultivoService: CultivoService,
  ) {}
  async create(idCultivo: number, createIotDto: CreateIotDto) {
    const cultivo = await this.cultivoService.getCultivoIot(idCultivo);
    const iot = this.iotRepository.create(createIotDto);
    iot.cultivo = cultivo;

    return await this.iotRepository.save(iot);
  }

  findAll(idCultivo: number) {
    return this.cultivoService.getCultivoIot(idCultivo);
  }

  remove(iots: Iot[]) {
    iots.forEach(async (iot) => {
      await this.iotRepository.softDelete(iot.idIot);
    });
  }
}
