import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'correo',
      passwordField: 'contraseña',
    });
  }

  async validate(correo: string, contraseña: string): Promise<any> {
    const pequeñoProductor = await this.authService.validatePequeñoProductor(
      correo,
      contraseña,
    );
    if (!pequeñoProductor) {
      throw new HttpException(
        'pequeñor productor con correo y/o contraseña incorrectos',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return pequeñoProductor;
  }
}
