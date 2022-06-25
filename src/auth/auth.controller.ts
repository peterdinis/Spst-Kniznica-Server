import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto"
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @ApiOperation({
    summary: "Login new user"
  })
  @ApiCreatedResponse()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: "Logged user data"
  })
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOperation({
    summary: "Register new user"
  })
  @ApiCreatedResponse()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }
}