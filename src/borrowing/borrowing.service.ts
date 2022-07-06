import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import {Borrow} from "./borrowing.entity";
import {Book} from "../book/book.entity";
import {User} from "../users/user.entity";
import { UpdateQuantityDto } from './dto/card.dto';
import { BookRepository } from 'src/book/book.constants';
import { UserRepository } from 'src/users/users.constants';
import { BorrowingRepository } from './borrowing.constants';

@Injectable()
export class BorrowingService {
    constructor(
        @Inject(BookRepository) private readonly bookRepository: typeof Book,
        @Inject(UserRepository) private readonly userRepository: typeof User,
        @Inject(BorrowingRepository) private readonly borrowingRepository: typeof Borrow,
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
                const newOrder = await this.borrowingRepository.create({
                    quantity: 1,
                    bookId,
                    userId
                })

                newOrder.save();

                return await this.borrowingRepository.findOne({
                    where: {
                        bookId: newOrder.bookId,
                        userId: newOrder.userId
                    },

                    include: [Book, User]
                })
            } else {
                cartItem.quantity =  cartItem.quantity + 1;
                return cartItem.save();
            }
        } catch(error) {
            throw new BadRequestException(error)
        }
    }

    async returnBook(userId: string, bookId: string) {
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

            if(cartItem.quantity >1) {
                cartItem.quantity = cartItem.quantity -1;
                return  cartItem.save();
            } else {
                return cartItem.destroy();
            }
        } catch(error) {
            throw new BadRequestException(error)
        }
    }

    async updateQuantity(id: number, quantityDto: UpdateQuantityDto) {
        try {
            const cartItem = await this.borrowingRepository.findOne({
                where: {
                    id,
                },

                include: [Book, User]
            });

            if(!cartItem) {
                throw new NotFoundException("Requested card item not found");
            }

            cartItem.quantity = quantityDto.quantity
            return cartItem.save();
        } catch(error) {
            throw new BadRequestException(error)
        }
    }
}