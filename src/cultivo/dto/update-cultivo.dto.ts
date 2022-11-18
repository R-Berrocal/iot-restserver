import { PartialType } from '@nestjs/mapped-types';
import { CreateCultivoDto } from './create-cultivo.dto';

export class UpdateCultivoDto extends PartialType(CreateCultivoDto) {}
