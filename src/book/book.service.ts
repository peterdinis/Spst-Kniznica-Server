import { Injectable, Logger } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
@Injectable()
export class BookService {
    private logger = new Logger(BookService.name);

    constructor(private prismaService: PrismaService) { 

    }
}