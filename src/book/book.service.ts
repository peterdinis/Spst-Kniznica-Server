import { Injectable, Logger } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
@Injectable()
export class BookService {
    private logger = new Logger(BookService.name);

    constructor(private prismaService: PrismaService) { }

    async createNewbook(createBookData: CreateBookDto) {
        const result = await this.prismaService.book.create({
            data: createBookData
        });
        this.logger.log(`Book has been created : ${JSON.stringify(result)}`)
        return result
    }

    async allBooks() {
        const result = await this.prismaService.book.findMany();
        return result
    }

    async findOneBook(id: string) {
        return this.prismaService.book.findUnique({ where: { id } });
    }

    async update(id: string, updateBookData: UpdateBookDto) {
        const result = await this.prismaService.book.update({
          data: updateBookData,
          where: { id },
        });
        this.logger.warn(`Book has been updated : ${JSON.stringify(result)}`)
        return result
      }
    
      async remove(id: string) {
        const result = await this.prismaService.book.delete({ where: { id } });
        this.logger.warn(`Book has been deleted : ${JSON.stringify(result)}`)
        return result
      }
}