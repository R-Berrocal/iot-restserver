import { Injectable, NestMiddleware } from '@nestjs/common';
import { PequeñosProductoresService } from 'src/pequeños_productores/pequeños_productores.service';

@Injectable()
export class PequeñosProductoresMiddleware implements NestMiddleware {
  constructor(private pequeñoProductorService: PequeñosProductoresService) {}
  async use(req: any, res: any, next: () => void) {
    const respuesta = await this.pequeñoProductorService.userNotExist(
      req.params.id,
    );
    if (respuesta) {
      return res.status(respuesta.getStatus()).json(respuesta);
    }
    next();
  }
}
