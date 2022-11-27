import { IsNotEmpty } from 'class-validator';

export class CreateGastoDto {
  @IsNotEmpty()
  tipo: string;
  cantidad: number;

  @IsNotEmpty()
  costo: number;
}
