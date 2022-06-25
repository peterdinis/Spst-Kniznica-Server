import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto"
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }


  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }
}