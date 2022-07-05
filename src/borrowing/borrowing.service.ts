import { Injectable, Inject } from '@nestjs/common';
import {Borrow} from "./borrowing.entity";
import {Book} from "../book/book.entity";
import {User} from "../users/user.entity";
import {BookService} from "../book/book.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class BorrowingService {
    constructor(
        private readonly bookService: BookService,
        private readonly usersService: UsersService,
        @Inject("BookRepository") private readonly bookRepository: typeof Book,
        @Inject("UserRepository") private readonly userRepository: typeof User,
        @Inject("BorrowingRepository") private readonly borrowingRepository: typeof Borrow,
    ) {}


    async myCart() {
        const borrowedBooks = await this.borrowingRepository.findAll<Borrow>({
            include: [Book, User]
        });

        return borrowedBooks;
    }
}