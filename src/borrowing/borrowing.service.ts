import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {Borrow} from "./borrowing.entity";
import {Book} from "../book/book.entity";
import {User} from "../users/user.entity";
import {BookService} from "../book/book.service";
import {UsersService} from "../users/users.service";
import { UpdateQuantityDto } from './dto/card.dto';

@Injectable()
export class BorrowingService {
    constructor(
        private readonly bookService: BookService,
        private readonly usersService: UsersService,
        @Inject("BookRepository") private readonly bookRepository: typeof Book,
        @Inject("UserRepository") private readonly userRepository: typeof User,
        @Inject("BorrowingRepository") private readonly borrowingRepository: typeof Borrow,
    ) {}


    async myBorrowedBooks() {
        const borrowedBooks = await this.borrowingRepository.findAll<Borrow>({
            include: [Book, User]
        });

        return borrowedBooks;
    }

    async borrowBook(bookId: string, userId: string) {
        try {
            const checkBook = await this.bookRepository.findOne({
                where: {
                    id: bookId,
                }
            })
    
            const checkUser = await this.userRepository.findOne({
                where: {
                    id: userId
                }
            })
    
            const cartItem = await this.borrowingRepository.findOne({
                where: {
                    bookId: checkBook.id,
                    userId: checkUser.id
                },
    
                include: [Book, User]
            });
    
            if(!cartItem) {
    
            }
        } catch(error) {
            throw new BadRequestException(error.message)
        }
    }

    async returnBook(userId: string, bookId: string) {}

    async updateQuantity(id: number, quantity: UpdateQuantityDto) {}
}