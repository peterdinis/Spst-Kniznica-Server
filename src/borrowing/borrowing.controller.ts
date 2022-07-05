import { Controller, Get, Param, Post } from "@nestjs/common";
import {BorrowingService} from "./borrowing.service";
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@ApiTags("Borrow book")
@Controller("borrowing") 
export class BorrowingController {
    constructor(private readonly borrowingService: BorrowingService) {}

    @ApiOperation({
        summary: "Student cart"
    })
    @ApiOkResponse()
    @Get("/card")
    async myCard() {
        return this.borrowingService.myBorrowedBooks();
    }


    @ApiOperation({
        summary: "Borrow book"
    })
    @ApiCreatedResponse()
    @Post("/borrow")
    async borrowBook(
        @Param("bookId") bookId: string, 
        @Param("userId") userId: string
    ) {
        return this.borrowingService.borrowBook(bookId, userId);
    }
}