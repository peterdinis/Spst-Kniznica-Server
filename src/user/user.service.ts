import { ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {Request} from "express";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) { }

  async getUser(id: string, req: Request) {
    const decodedUserInfo = req.user as { id: string; email: string };

    const foundUser = await this.prismaService.user.findUnique({ where: { id } });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (foundUser.id !== decodedUserInfo.id) {
      throw new ForbiddenException();
    }

    return { user: foundUser };
  }

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true
      }
    })

    return users;
  }
 
}