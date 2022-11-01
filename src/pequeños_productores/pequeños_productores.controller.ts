import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePequeñosProductoresDto } from './dto/create-pequeño-productor.dto';
import { UpdatePequeñoProductorDto } from './dto/update-pequeño-productor.dto';
import { PequeñosProductores } from './pequeños_productores.entity';
import { PequeñosProductoresService } from './pequeños_productores.service';

@Controller('pequenos-productores')
export class PequeñosProductoresController {
  constructor(private pequeñosProductoresService: PequeñosProductoresService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getPequeñosProductores(): Promise<PequeñosProductores[]> {
    return this.pequeñosProductoresService.getPequeñosProductores();
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePequeñosProductores(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PequeñosProductores> {
    return this.pequeñosProductoresService.deletePequeñoProductor(id);
  }
}
