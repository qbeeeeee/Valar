import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: Record<string, string>) {
    return this.authService.signUp(body.email, body.password, body.name);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() body: Record<string, string>) {
    return this.authService.signIn(body.email, body.password);
  }
}
