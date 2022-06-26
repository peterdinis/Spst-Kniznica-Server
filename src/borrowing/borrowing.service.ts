import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { UpdateQuantityDto } from './dto/card-dto';
import {PrismaService} from "../prisma/prisma.service";
@Injectable()
export class BorrowingService {
    private logger = new Logger(BorrowingService.name);

    constructor(private prismaService: PrismaService) { }


}