import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import {UpdateBookDto } from './dto/update-book.dto';
import {ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse} from "@nestjs/swagger"

@ApiTags("Books")
@Controller("books")
export class BookController {
    constructor(private bookService: BookService) {}

    @ApiOperation({
        summary: "All Books"
    })
    @ApiOkResponse()
    @Get("/")
    findAllBooks() {
        return this.bookService.allBooks();
    }

    @ApiOperation({
        summary: "Create new book"
    })
    @ApiCreatedResponse()
    @Post("/")
    createBook(
        @Body() createBookData: CreateBookDto
    ) {
        return this.bookService.createBook(createBookData);
    }

    @ApiOperation({
        summary: "Get one book"
    })
    @ApiOkResponse()
    @Get("/:id")
    oneBook(
        @Param("id") id: number
    ) {
        return this.bookService.findOneBook(id);
    }

    @ApiOperation({
        summary: "Update book"
    })
    @ApiOkResponse()
    @Patch("/:id")
    updateBook(
        @Param("id") id: number,
        @Body() updateBookData: UpdateBookDto
    ) {
        return this.bookService.updateBook(id, updateBookData);
    }

    @ApiOperation({
        summary: "Delete book"
    })
    @Delete("/:id")
    deleteBook(
        @Param("id") id
    ) {
        return this.bookService.removeBook(id);
    }
}