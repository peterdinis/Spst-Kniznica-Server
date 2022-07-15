import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {Book} from "./book.entity"
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>
    ) {}
  private readonly logger = new Logger(BookService.name);

  async allBooks() {
    const books = await this.bookRepository.find();
    this.logger.log("All books from database");
    return books;
  }

  async createBook(createBookData: CreateBookDto) {
    const newBook = await this.bookRepository.create(createBookData);
    return newBook;
  }

  async findOneBook(id: number) {
    const book = await this.bookRepository.findOne({
      where: {
        id
      }
    });

    this.logger.log("Find one book by id");
    return book;
  }

  async updateBook(id: number, updateBook: UpdateBookDto) {
    try {
      const book = await this.bookRepository.findOne({
        where: {
          id
        }
      });

      if(!book) {
        throw new NotFoundException("Book with this id not found");
      }

      this.logger.log("Update book");
      return await this.bookRepository.update(id, updateBook);
  
    } catch(error) {
      throw new BadRequestException(error);
    }
    
  }

  async removeBook(id) {
    try {
      const book = await this.bookRepository.findOneByOrFail(id);
      if(!book) {
        throw new NotFoundException("Book not found")
      }

      this.logger.log("Delete book");
      await this.bookRepository.remove(book);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}