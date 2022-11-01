import { Injectable } from '@nestjs/common';
import { PequeñosProductoresService } from 'src/pequeños_productores/pequeños_productores.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private pequeñosProductoresService: PequeñosProductoresService,
    private jwtService: JwtService,
  ) {}

  async validatePequeñoProductor(
    correo: string,
    contraseña: string,
  ): Promise<any> {
    const pequeñoProductor = await this.pequeñosProductoresService.correoExiste(
      correo,
    );
    const validarContraseña = await bcrypt.compare(
      contraseña,
      pequeñoProductor.contraseña,
    );

    if (pequeñoProductor && validarContraseña) {
      const { contraseña, ...result } = pequeñoProductor;
      return result;
    }
    return null;
  }

  async login(pequeñoProductor: any) {
    const { correo, idPequeñosProductores } = pequeñoProductor;
    const payload = { correo, idPequeñosProductores };

    return {
      correo,
      idPequeñosProductores,
      token: this.jwtService.sign(payload),
    };
  }
}
