import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PequeñosProductores } from './pequeños_productores.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePequeñosProductoresDto } from './dto/create-pequeño-productor.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePequeñoProductorDto } from './dto/update-pequeño-productor.dto';

@Injectable()
export class PequeñosProductoresService {
  constructor(
    @InjectRepository(PequeñosProductores)
    private pequeñosProductoresRepository: Repository<PequeñosProductores>,
  ) {}

  getPequeñosProductores() {
    return this.pequeñosProductoresRepository.find();
  }

  async getPequeñoProductor(idPequeñosProductores: number) {
    const pequeñoProductor = await this.pequeñosProductoresRepository.findOne({
      where: {
        idPequeñosProductores,
      },
    });
    if (!pequeñoProductor) {
      return new HttpException('User not exist', HttpStatus.CONFLICT);
    }
    return pequeñoProductor;
  }

  async createPequeñoProductor(body: CreatePequeñosProductoresDto) {
    const pequeñoProductor = this.pequeñosProductoresRepository.create(body);
    pequeñoProductor.contraseña = await bcrypt.hash(
      pequeñoProductor.contraseña,
      10,
    );
    return this.pequeñosProductoresRepository.save(pequeñoProductor);
  }

  async updatePequeñoProductor(
    idPequeñosProductores: number,
    body: UpdatePequeñoProductorDto,
  ) {
    if (body.contraseña) {
      body.contraseña = await bcrypt.hash(body.contraseña, 10);
    }
    await this.pequeñosProductoresRepository.update(
      { idPequeñosProductores },
      body,
    );
    return await this.getPequeñoProductor(idPequeñosProductores);
  }

  async deletePequeñoProductor(id: number) {
    const pequeñoProductor = await this.getPequeñoProductor(id);
    await this.pequeñosProductoresRepository.softDelete(id);
    return pequeñoProductor;
  }

  async correoExiste(correo: string): Promise<any> {
    const pequeñoProductor = await this.pequeñosProductoresRepository.findOne({
      where: {
        correo,
      },
    });

    if (!pequeñoProductor) {
      return new HttpException(
        `Usuario con correo ${correo} no existe en la bd`,
        HttpStatus.CONFLICT,
      );
    }
    return pequeñoProductor;
  }
}
