import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IotService } from './iot.service';
import { CreateIotDto } from './dto/create-iot.dto';
import { UpdateIotDto } from './dto/update-iot.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('iot')
export class IotController {
  constructor(private readonly iotService: IotService) {}

  @Post(':idCultivo/cultivo')
  create(
    @Param('idCultivo', ParseIntPipe) idCultivo: number,
    @Body() createIotDto: CreateIotDto,
  ) {
    return this.iotService.create(idCultivo, createIotDto);
  }

  @Get(':idCultivo/cultivo')
  findAll(@Param('idCultivo', ParseIntPipe) idCultivo: number) {
    return this.iotService.findAll(idCultivo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIotDto: UpdateIotDto) {
    return this.iotService.update(+id, updateIotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iotService.remove(+id);
  }
}
