import { IsNotEmpty } from 'class-validator';

export class CreateIotDto {
  @IsNotEmpty()
  temperatura: number;

  @IsNotEmpty()
  humedad: number;

  @IsNotEmpty()
  ph: number;
}
