import { PartialType } from '@nestjs/mapped-types';
import { CreatePequeñoProductorDto } from './create-pequeño-productor.dto';

export class UpdatePequeñoProductorDto extends PartialType(
  CreatePequeñoProductorDto,
) {}
