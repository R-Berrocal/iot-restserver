import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CultivoService } from 'src/cultivo/cultivo.service';
import { Repository } from 'typeorm';
import { CreateIotDto } from './dto/create-iot.dto';
import { UpdateIotDto } from './dto/update-iot.dto';
import { Iot } from './entities/iot.entity';

@Injectable()
export class IotService {
  constructor(
    @InjectRepository(Iot) private iotRepository: Repository<Iot>,
    private cultivoService: CultivoService,
  ) {}
  async create(idCultivo: number, createIotDto: CreateIotDto) {
    const cultivo = await this.cultivoService.getCultivo(idCultivo);
    const iot = this.iotRepository.create(createIotDto);
    iot.cultivo = cultivo;

    return await this.iotRepository.save(iot);
  }

  findAll() {
    return `This action returns all iot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iot`;
  }

  update(id: number, updateIotDto: UpdateIotDto) {
    return `This action updates a #${id} iot`;
  }

  remove(id: number) {
    return `This action removes a #${id} iot`;
  }
}
