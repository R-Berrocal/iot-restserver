import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './auth/dto/login.dto';

@ApiTags('Authentication')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'login has succesfully' })
  @ApiResponse({ status: 401, description: 'invalid credentials' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Revalidate token' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Revalidated token' })
  @Get('auth')
  async renovateToken(@Request() req) {
    return this.authService.renovateToken(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'profile' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'return profile' })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  @ApiOperation({ summary: 'return hello world' })
  @ApiResponse({ status: 200, description: 'return hello world' })
  getHello(): string {
    return this.appService.getHello();
  }
}
