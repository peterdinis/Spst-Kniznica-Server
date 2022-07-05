import { Module } from "@nestjs/common";
import { userProviders } from "../users/user.providers";
import { bookProviders } from "../book/book.providers";
import { BookService } from "../book/book.service";
import { UsersService } from "../users/users.service";
import { BorrowingController } from "./borrowing.controller";
import { borrowingProviders } from "./borrowing.providers";
import { BorrowingService } from "./borrowing.service";
import {DatabaseModule} from "../database/database.module";

@Module({
     imports: [DatabaseModule],
     controllers: [BorrowingController],
     providers: [BorrowingService, ...borrowingProviders, BookService, ...bookProviders, UsersService, ...userProviders],
     exports: [BorrowingService]
})

export class BorrowingModule {}