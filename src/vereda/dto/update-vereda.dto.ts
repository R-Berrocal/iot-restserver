import { PartialType } from '@nestjs/mapped-types';
import { CreateVeredaDto } from './create-vereda.dto';

export class UpdateVeredaDto extends PartialType(CreateVeredaDto) {}
