import { Module } from '@nestjs/common';
import { PequeñosProductoresModule } from 'src/pequeños_productores/pequeños_productores.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PequeñosProductoresModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRETOR_PRIVATE_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
