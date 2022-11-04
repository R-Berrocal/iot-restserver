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
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePequeñoProductorDto } from './dto/create-pequeño-productor.dto';
import { UpdatePequeñoProductorDto } from './dto/update-pequeño-productor.dto';
import { PequeñoProductor } from './entities/pequeño_productor.entity';
import { PequeñoProductorService } from './pequeño_productor.service';

@Controller('pequenos-productores')
export class PequeñoProductorController {
  constructor(private pequeñoProductorService: PequeñoProductorService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getPequeñosProductores(): Promise<PequeñoProductor[]> {
    return this.pequeñoProductorService.getPequeñosProductores();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPequeñoProductor(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PequeñoProductor | HttpException> {
    return this.pequeñoProductorService.getPequeñoProductor(id);
  }

  @Post()
  createPequeñoProductor(
    @Body() newPequeñoProductor: CreatePequeñoProductorDto,
  ): Promise<PequeñoProductor> {
    return this.pequeñoProductorService.createPequeñoProductor(
      newPequeñoProductor,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updatePequeñoProductor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePequeñoProductor: UpdatePequeñoProductorDto,
  ): Promise<PequeñoProductor | HttpException> {
    return this.pequeñoProductorService.updatePequeñoProductor(
      id,
      updatePequeñoProductor,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePequeñoProductore(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PequeñoProductor | HttpException> {
    return this.pequeñoProductorService.deletePequeñoProductor(id);
  }
}
