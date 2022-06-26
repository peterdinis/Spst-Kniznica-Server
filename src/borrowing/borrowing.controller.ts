import { Controller, Delete, Get, Post, Put} from "@nestjs/common";
import { BorrowingService } from "./borrowing.service";

@Controller("borrowing")
export class BorrowingController {

    constructor(private readonly borrowingService: BorrowingService) {}

    @Get("/card/:userId")
    async myUserCard() {
        return this.borrowingService.myCard();
    }

    @Post("/:bookId/:userId")
    async borrowingBook() {
        return this.borrowingService.borrowBook();
    }

    @Delete("/delete/:bookId/:userId")
    async returnBook() {
        return this.borrowingService.removeBook();
    }

    @Put("/quantity/:borrowingId")
    async updateQuantity() {

    }
}