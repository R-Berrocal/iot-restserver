import { PartialType } from '@nestjs/mapped-types';
import { CreatePequeñosProductoresDto } from './create-pequeño-productor.dto';

export class UpdatePequeñoProductorDto extends PartialType(
  CreatePequeñosProductoresDto,
) {}
