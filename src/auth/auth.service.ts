import {
    BadRequestException,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { AuthDto } from './dto/auth.dto';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
  import { Request, Response } from 'express';
  
  @Injectable()
  export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}
  
    async signup(dto: AuthDto) {
      const {email, password} = dto;
      const userExists = await this.prisma..findUnique({
        where: { email },
      });
  
    }
  
    async signin(dto: AuthDto, req: Request, res: Response) {
     
    }
  
    async signout(req: Request, res: Response) {
      res.clearCookie('token');
  
      return res.send({ message: 'Logged out succefully' });
    }
  
    async hashPassword(password: string) {
      const saltOrRounds = 10;
  
      return await bcrypt.hash(password, saltOrRounds);
    }
  
    async comparePasswords(args: { hash: string; password: string }) {
      return await bcrypt.compare(args.password, args.hash);
    }
  
    async signToken(args: { userId: string; email: string }) {
      const payload = {
        id: args.userId,
        email: args.email,
      };
  
      const token = await this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET
      });
  
      return token;
    }
  }