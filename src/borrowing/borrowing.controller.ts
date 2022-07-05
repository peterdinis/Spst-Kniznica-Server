import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {BorrowingService} from "./borrowing.service";
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { UpdateQuantityDto } from "./dto/card.dto";

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
    @Post("/borrow/:userId/:bookId")
    async borrowBook(
        @Param("bookId") bookId: string, 
        @Param("userId") userId: string
    ) {
        return this.borrowingService.borrowBook(bookId, userId);
    }

    @ApiOperation({
        summary: "Return book"
    })
    @ApiOkResponse()
    @Delete("/delete/:userId/:bookId")
    async returnBook(
        @Param("bookId") bookId: string, 
        @Param("userId") userId: string
    ) {
        return this.borrowingService.returnBook(bookId, userId);
    }

    @ApiOperation({
        summary: "Update quantity"
    })
    @Put("/quantity/:cardId")
    updateQuantity(@Param("cardId") cardId: number, @Body() quantityDto: UpdateQuantityDto) {
        return this.borrowingService.updateQuantity(cardId, quantityDto);
    }
}