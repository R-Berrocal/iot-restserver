import { Injectable } from '@nestjs/common';
import { PequeñoProductorService } from 'src/pequeño_productor/pequeño_productor.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private pequeñoProductorService: PequeñoProductorService,
    private jwtService: JwtService,
  ) {}

  async validatePequeñoProductor(
    correo: string,
    contraseña: string,
  ): Promise<any> {
    const pequeñoProductor = await this.pequeñoProductorService.correoNoExiste(
      correo,
    );

    const validarContraseña = await bcrypt.compare(
      contraseña,
      pequeñoProductor ? pequeñoProductor.contraseña : ' ',
    );

    if (pequeñoProductor && validarContraseña) {
      const { contraseña, ...result } = pequeñoProductor;
      return result;
    }
    return null;
  }

  async login(pequeñoProductor: any) {
    const { correo, idPequeñoProductor } = pequeñoProductor;
    const payload = { correo, idPequeñoProductor };

    return {
      correo,
      idPequeñoProductor,
      token: this.jwtService.sign(payload),
    };
  }
}
