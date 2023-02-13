import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'test1@test.com',
    description: 'Email del usuario',
  })
  correo: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña del usuario',
  })
  contraseña: string;
}
