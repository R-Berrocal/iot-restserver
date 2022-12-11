import { PartialType } from '@nestjs/mapped-types';
import { CreateIotDto } from './create-iot.dto';

export class UpdateIotDto extends PartialType(CreateIotDto) {}
