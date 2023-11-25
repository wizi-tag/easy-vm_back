import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthUserDto } from '../../dto/auth-user.dto';

import { AuthService } from './auth.service';
import { AuthResponse } from './types';
import { User } from 'src/db/models/user';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  registerUser(@Body(ValidationPipe) user: AuthUserDto): Promise<AuthResponse> {
    return this.authService.registerUser(user);
  }

  @Post('sign-in')
  authorizeUser(@Body() user: AuthUserDto): Promise<AuthResponse> {
    return this.authService.authorizeUser(user);
  }

  @UseGuards(AuthGuard)
  @Get('whoami')
  verifyUser(@Req() req: Request & { user: { id: number } }): Promise<User> {
    return this.authService.verifyUser(req.user.id);
  }
}
