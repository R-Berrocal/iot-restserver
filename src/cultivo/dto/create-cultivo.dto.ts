import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateCultivoDto {
  @IsNotEmpty()
  hectareas: number;
  descripcion: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_siembre: Date;
}
