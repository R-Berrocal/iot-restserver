import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { CreatePequeñosProductoresDto } from './dto/create-pequeño-productor.dto';
import { UpdatePequeñoProductorDto } from './dto/update-pequeño-productor.dto';
import { PequeñosProductores } from './pequeños_productores.entity';
import { PequeñosProductoresService } from './pequeños_productores.service';

@Controller('pequenos-productores')
export class PequeñosProductoresController {
  constructor(private pequeñosProductoresService: PequeñosProductoresService) {}

  @Get()
  getPequeñosProductores(): Promise<PequeñosProductores[]> {
    return this.pequeñosProductoresService.getPequeñosProductores();
  }

  @Get(':id')
  getPequeñoProductor(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PequeñosProductores> {
    return this.pequeñosProductoresService.getPequeñoProductor(id);
  }

  @Post()
  createPequeñosProductores(
    @Body() newPequeñoProductor: CreatePequeñosProductoresDto,
  ): Promise<PequeñosProductores> {
    return this.pequeñosProductoresService.createPequeñoProductor(
      newPequeñoProductor,
    );
  }

  @Put(':id')
  updatePequeñosProductores(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePequeñoProductor: UpdatePequeñoProductorDto,
  ): Promise<PequeñosProductores> {
    return this.pequeñosProductoresService.updatePequeñoProductor(
      id,
      updatePequeñoProductor,
    );
  }

  @Delete(':id')
  deletePequeñosProductores(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PequeñosProductores> {
    return this.pequeñosProductoresService.deletePequeñoProductor(id);
  }
}
