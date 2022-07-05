import { Injectable, Inject } from '@nestjs/common';
import {Book} from "./book.entity"
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";

@Injectable()
export class BookService {
  constructor(@Inject("BookRepository") private readonly bookRepository: typeof Book) {}

  async allBooks() {
    const books = await this.bookRepository.findAll({});
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
    book.borrowedTime = createBookData.borrowedTime;

    return book.save();
  }

  async findOneBook(id: string) {
    const book = await this.bookRepository.findOne({
      where: {
        id
      }
    });

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
    book.borrowedTime = updateBook.borrowedTime || book.borrowedTime;

    return book.save();
  }

  async removeBook(id: string) {
    const book = await this.bookRepository.findOne({
      where: {
        id
      }
    });

    await book.destroy();
    return book
  }
}