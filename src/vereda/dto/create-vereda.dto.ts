import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVeredaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
