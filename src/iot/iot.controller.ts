import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { IotService } from './iot.service';
import { CreateIotDto } from './dto/create-iot.dto';

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
}
