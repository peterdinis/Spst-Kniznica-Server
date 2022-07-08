import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import {BookController} from "./book.controller"
import {DatabaseModule} from "../database/database.module"
import {bookProviders} from "./book.providers"
import { Logger} from '@nestjs/common';
@Module({
    imports: [DatabaseModule, Logger],
    controllers: [BookController],
    providers: [BookService, ...bookProviders],
    exports: [...bookProviders]
})

export class BookModule {}