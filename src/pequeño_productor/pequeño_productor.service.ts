import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { PequeñoProductor } from './entities/pequeño_productor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePequeñoProductorDto } from './dto/create-pequeño-productor.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePequeñoProductorDto } from './dto/update-pequeño-productor.dto';

@Injectable()
export class PequeñoProductorService {
  constructor(
    @InjectRepository(PequeñoProductor)
    private pequeñoProductorRepository: Repository<PequeñoProductor>,
  ) {}

  getPequeñosProductores() {
    return this.pequeñoProductorRepository.find();
  }

  async getPequeñoProductor(idPequeñoProductor: number) {
    const pequeñoProductor = await this.pequeñoProductorRepository.findOne({
      where: {
        idPequeñoProductor,
      },
    });
    if (!pequeñoProductor) {
      throw new HttpException(
        'Pequeño productor no existe en la bd',
        HttpStatus.NOT_FOUND,
      );
    }
    return pequeñoProductor;
  }

  async createPequeñoProductor(body: CreatePequeñoProductorDto) {
    await this.correoExiste(body.correo);
    const pequeñoProductor = this.pequeñoProductorRepository.create(body);
    pequeñoProductor.contraseña = await bcrypt.hash(
      pequeñoProductor.contraseña,
      10,
    );
    return this.pequeñoProductorRepository.save(pequeñoProductor);
  }

  async updatePequeñoProductor(
    idPequeñoProductor: number,
    body: UpdatePequeñoProductorDto,
    pequeñoProductorAuth: any,
  ) {
    if (body.contraseña) {
      body.contraseña = await bcrypt.hash(body.contraseña, 10);
    }
    const pequeñoProductor = await this.getPequeñoProductor(idPequeñoProductor);
    if (
      pequeñoProductor.idPequeñoProductor !=
      pequeñoProductorAuth.idPequeñoProductor
    ) {
      throw new UnauthorizedException();
    }
    await this.pequeñoProductorRepository.update({ idPequeñoProductor }, body);
    return pequeñoProductor;
  }

  async deletePequeñoProductor(id: number, pequeñoProductorAuth: any) {
    const pequeñoProductor = await this.getPequeñoProductor(id);
    if (
      pequeñoProductor.idPequeñoProductor !=
      pequeñoProductorAuth.idPequeñoProductor
    ) {
      throw new UnauthorizedException();
    }
    await this.pequeñoProductorRepository.softDelete(id);
    return pequeñoProductor;
  }

  async correoExiste(correo: string): Promise<any> {
    const pequeñoProductor = await this.pequeñoProductorRepository.findOne({
      where: {
        correo,
      },
    });

    if (pequeñoProductor) {
      throw new HttpException(
        `pequeño productor  con correo ${correo} ya existe en la bd`,
        HttpStatus.CONFLICT,
      );
    }
  }

  async correoNoExiste(correo: string): Promise<any> {
    const pequeñoProductor = await this.pequeñoProductorRepository.findOne({
      where: {
        correo,
      },
    });

    if (!pequeñoProductor) {
      return null;
    }
    return pequeñoProductor;
  }
}
