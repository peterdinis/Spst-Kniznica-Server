import { Module } from "@nestjs/common";
import { userProviders } from "../users/user.providers";
import { bookProviders } from "../book/book.providers";
import { BorrowingController } from "./borrowing.controller";
import { borrowingProviders } from "./borrowing.providers";
import { BorrowingService } from "./borrowing.service";
import {DatabaseModule} from "../database/database.module";

@Module({
     imports: [DatabaseModule],
     controllers: [BorrowingController],
     providers: [BorrowingService, ...borrowingProviders, ...bookProviders, ...userProviders],
})

export class BorrowingModule {}