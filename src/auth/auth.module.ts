import { Module } from '@nestjs/common';
import { PequeñoProductorModule } from 'src/pequeño_productor/pequeño_productor.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PequeñoProductorModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRETOR_PRIVATE_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
