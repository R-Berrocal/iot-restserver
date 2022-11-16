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
  Request,
  UnauthorizedException,
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
  async getPequeñoProductor(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<PequeñoProductor> {
    const pequeñoProductor =
      await this.pequeñoProductorService.getPequeñoProductor(id);
    if (pequeñoProductor.idPequeñoProductor != req.user.idPequeñoProductor)
      throw new UnauthorizedException();
    return pequeñoProductor;
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
    @Request() req,
  ): Promise<PequeñoProductor> {
    return this.pequeñoProductorService.updatePequeñoProductor(
      id,
      updatePequeñoProductor,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePequeñoProductore(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<PequeñoProductor> {
    return this.pequeñoProductorService.deletePequeñoProductor(id, req.user);
  }
}
