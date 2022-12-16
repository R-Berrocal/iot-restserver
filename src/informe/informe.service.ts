import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CultivoService } from 'src/cultivo/cultivo.service';
import { IotService } from 'src/iot/iot.service';
import { Repository } from 'typeorm';
import { Informe } from './entities/informe.entity';

@Injectable()
export class InformeService {
  constructor(
    @InjectRepository(Informe) private informeRepository: Repository<Informe>,
    private cultivoService: CultivoService,
    private iotService: IotService,
  ) {}
  async create(idCultivo: number, idPequeñoProductor: number) {
    const cultivo = await this.cultivoService.findOne(
      idCultivo,
      idPequeñoProductor,
    );
    const { iots } = cultivo;
    if (iots.length === 0) {
      throw new HttpException('No iot data', HttpStatus.CONFLICT);
    }
    const temperaturas = iots.map((iot) => iot.temperatura);
    const phs = iots.map((iot) => iot.ph);
    const humedades = iots.map((iot) => iot.humedad);

    const informe = this.informeRepository.create({
      temperaturaMaxima: this.maxMinAvg(temperaturas).max,
      temperaturaPromedio: Number(this.maxMinAvg(temperaturas).avg.toFixed(2)),
      temperaturaMinima: this.maxMinAvg(temperaturas).min,
      phMaximo: this.maxMinAvg(phs).max,
      phPromedio: Number(this.maxMinAvg(phs).avg.toFixed(2)),
      phMinimo: this.maxMinAvg(phs).min,
      humedadMaxima: this.maxMinAvg(humedades).max,
      humedadPromedio: Number(this.maxMinAvg(humedades).avg.toFixed(2)),
      humedadMinima: this.maxMinAvg(humedades).min,
    });
    informe.cultivo = cultivo;
    this.iotService.remove(iots);
    return await this.informeRepository.save(informe);
  }

  async findAll(idCultivo: number, idPequeñoProductor: number) {
    const { informes } = await this.cultivoService.findOne(
      idCultivo,
      idPequeñoProductor,
    );
    return informes;
  }

  async findOne(idInforme: number) {
    const informe = await this.informeRepository.findOne({
      where: {
        idInforme,
      },
    });
    if (!informe)
      throw new HttpException('report not exist in db', HttpStatus.NOT_FOUND);
    return informe;
  }

  async remove(idInforme: number) {
    const informe = await this.findOne(idInforme);
    await this.informeRepository.softDelete(idInforme);
    return informe;
  }

  maxMinAvg(array: number[]) {
    const sum = array.reduce(
      (acumulator, currentValue) => acumulator + currentValue,
      0,
    );
    return {
      max: Math.max(...array),
      min: Math.min(...array),
      avg: sum / array.length,
    };
  }
}
