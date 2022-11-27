import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CultivoService } from 'src/cultivo/cultivo.service';
import { Repository } from 'typeorm';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { Gasto } from './entities/gasto.entity';

@Injectable()
export class GastoService {
  constructor(
    @InjectRepository(Gasto) private gastoRepository: Repository<Gasto>,
    private cultivoService: CultivoService,
  ) {}
  async create(
    idCultivo: number,
    idPequeñoProductor: number,
    createGastoDto: CreateGastoDto[],
  ) {
    const gastos = [];
    const cultivo = await this.cultivoService.findOne(
      idCultivo,
      idPequeñoProductor,
    );

    createGastoDto.forEach(async (newElement) => {
      const gasto = this.gastoRepository.create(newElement);
      gasto.cultivo = cultivo;
      gastos.push(gasto);
      await this.gastoRepository.save(gasto);
    });

    return gastos;
  }

  async findAll(idCultivo: number, idPequeñoProductor: number) {
    const { gastos } = await this.cultivoService.findOne(
      idCultivo,
      idPequeñoProductor,
    );

    return gastos;
  }

  async findOne(idGasto: number) {
    const gasto = await this.gastoRepository.findOne({
      where: {
        idGasto,
      },
      relations: ['cultivo.pequeño_productor'],
    });
    if (!gasto) {
      throw new HttpException('Gasto no existe en la bd', HttpStatus.NOT_FOUND);
    }
    return gasto;
  }

  update(id: number, updateGastoDto: UpdateGastoDto) {
    return `This action updates a #${id} gasto`;
  }

  remove(id: number) {
    return `This action removes a #${id} gasto`;
  }
}
