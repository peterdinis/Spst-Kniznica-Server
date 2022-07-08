import { Injectable, Inject, Logger } from '@nestjs/common';
import { BookRepository } from './book.constants';
import {Book} from "./book.entity"
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";

@Injectable()
export class BookService {
  constructor(@Inject(BookRepository) private readonly bookRepository: typeof Book) {}
  private readonly logger = new Logger(BookService.name);

  async allBooks() {
    const books = await this.bookRepository.findAll({});
    this.logger.log("All books from database");
    return books;
  }

  async createBook(createBookData: CreateBookDto) {
    const book = new Book();
    book.name = createBookData.name,
    book.description = createBookData.description,
    book.author = createBookData.author;
    book.year = createBookData.year;
    book.pages = createBookData.pages;
    book.avaiable = createBookData.avaiable;
    this.logger.log("New book was created");
    return book.save();
  }

  async findOneBook(id: string) {
    const book = await this.bookRepository.findOne({
      where: {
        id
      }
    });

    this.logger.log("Find one book by id");
    return book;
  }

  async updateBook(id: string, updateBook: UpdateBookDto) {
    const book = await this.bookRepository.findOne({
      where: {
        id
      }
    });

    book.name = updateBook.name || book.name;
    book.description = updateBook.description || book.description
    book.author = updateBook.author || book.author;
    book.year = updateBook.year || book.year;
    book.pages = updateBook.pages || book.pages;
    book.avaiable = updateBook.avaiable || book.avaiable;

    this.logger.log("Update book by id");
    return book.save();
  }

  async removeBook(id: string) {
    const book = await this.bookRepository.findOne({
      where: {
        id
      }
    });

    await book.destroy();
    this.logger.log("Remove book from database")
    return book
  }
}